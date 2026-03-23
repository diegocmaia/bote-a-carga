/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_ID?: string
}

interface Window {
  dataLayer: unknown[]
}
