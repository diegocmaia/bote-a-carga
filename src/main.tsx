import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const gaId = import.meta.env.VITE_GA_ID
if (gaId) {
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer ?? []
  function gtag(...args: unknown[]) { window.dataLayer.push(args) }
  gtag('js', new Date())
  gtag('config', gaId)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
