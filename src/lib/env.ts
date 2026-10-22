const DEFAULT_API_URL = 'https://backend-project-solab.onrender.com/api'

export const API_URL = (
  import.meta.env.VITE_API_URL ?? DEFAULT_API_URL
).replace(/\/+$/, '')
