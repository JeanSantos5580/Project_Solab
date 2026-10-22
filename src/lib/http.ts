import { solarimetricDataSchema } from '../schemas/SolarimetricData'
import { API_URL } from './env'

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status = 0, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      signal,
      headers: { Accept: 'application/json' }
    })
  } catch (error) {
    if (isAbortError(error)) {
      throw error
    }

    throw new ApiError(
      'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
      0,
      'NETWORK_ERROR'
    )
  }

  const body = (await response.json().catch(() => null)) as {
    error?: { message?: string; code?: string }
  } | null

  if (!response.ok) {
    throw new ApiError(
      body?.error?.message ?? 'Não foi possível carregar os dados.',
      response.status,
      body?.error?.code
    )
  }

  return body as T
}

function parseStringList(value: unknown): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === 'string')) {
    throw new ApiError(
      'Resposta inválida do servidor.',
      500,
      'INVALID_RESPONSE'
    )
  }

  return value
}

export const solarimetricApi = {
  async getStates(signal?: AbortSignal): Promise<string[]> {
    const data = await request<unknown>('/states', signal)
    return parseStringList(data)
  },

  async getCities(state: string, signal?: AbortSignal): Promise<string[]> {
    const data = await request<unknown>(
      `/states/${encodeURIComponent(state)}/cities`,
      signal
    )
    return parseStringList(data)
  },

  async getCity(state: string, city: string, signal?: AbortSignal) {
    const data = await request<unknown>(
      `/solar?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`,
      signal
    )

    return solarimetricDataSchema.parse(data)
  }
}
