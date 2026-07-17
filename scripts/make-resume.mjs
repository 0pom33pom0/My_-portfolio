/**
 * Generates a minimal but structurally valid single-page PDF placeholder at
 * public/resume.pdf. Byte offsets in the xref table are computed, not
 * hand-written, so the file always parses. The owner replaces this file with
 * a real resume; the site links to /resume.pdf either way.
 *
 * Run: node scripts/make-resume.mjs
 */
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const out = resolve(dirname(fileURLToPath(import.meta.url)), '../public/resume.pdf')

const lines = [
  ['Suracha Hanthongchai (Pom Pam)', 26, 760],
  ['Software Developer & Computer Educator', 16, 724],
  ['This file is a placeholder.', 12, 670],
  ['Replace public/resume.pdf with the real resume PDF;', 12, 650],
  ['the website link keeps working unchanged.', 12, 630],
]

const escapePdfText = (text) => text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

const content = lines
  .map(([text, size, y]) => `BT /F1 ${size} Tf 72 ${y} Td (${escapePdfText(text)}) Tj ET`)
  .join('\n')

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
  `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
]

let pdf = '%PDF-1.4\n'
const offsets = []
objects.forEach((body, index) => {
  offsets.push(pdf.length)
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
})

const xrefStart = pdf.length
pdf += `xref\n0 ${objects.length + 1}\n`
pdf += '0000000000 65535 f \n'
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

writeFileSync(out, pdf, 'latin1')
console.log(`wrote ${out} (${pdf.length} bytes)`)
