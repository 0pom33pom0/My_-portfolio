import { certificates, parseCertificateFilename } from './certificates.ts'

describe('parseCertificateFilename (filename convention)', () => {
  it('parses a "YYYY-MM name" prefix into date and name', () => {
    expect(parseCertificateFilename('2023-08 arduino.svg')).toEqual({
      id: 'arduino',
      date: '2023-08',
      fallbackName: 'arduino',
    })
  })

  it('handles multi-word names and mixed separators', () => {
    expect(parseCertificateFilename('2025-01_Regional AI Award.jpg')).toEqual({
      id: 'regional-ai-award',
      date: '2025-01',
      fallbackName: 'Regional AI Award',
    })
  })

  it('treats files without a valid date prefix as name-only', () => {
    expect(parseCertificateFilename('certificate_12345.png')).toEqual({
      id: 'certificate_12345',
      date: undefined,
      fallbackName: 'certificate 12345',
    })
    expect(parseCertificateFilename('2025-13 not-a-month.jpg').date).toBeUndefined()
  })
})

describe('discovered certificates', () => {
  it('discovers the shipped files, dated ones first and newest first', () => {
    expect(certificates.length).toBeGreaterThanOrEqual(3)

    const dated = certificates.filter((certificate) => certificate.date)
    expect(
      certificates.slice(0, dated.length).every((c) => c.date),
    ).toBe(true)

    const dates = dated.map((certificate) => certificate.date ?? '')
    expect([...dates].sort().reverse()).toEqual(dates)
  })
})
