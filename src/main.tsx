import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/prompt/500.css'
import '@fontsource/prompt/600.css'
import '@fontsource/prompt/700.css'
import '@fontsource/sarabun/400.css'
import '@fontsource/sarabun/600.css'
import './index.css'
import './i18n/index.ts'
import App from './App.tsx'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root container "#root" is missing in index.html')
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
