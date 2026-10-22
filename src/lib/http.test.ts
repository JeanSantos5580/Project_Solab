import { afterEach, describe, expect, it, vi } from 'vitest'
import { ApiError, solarimetricApi } from './http'

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('solarimetricApi', () => {
  it('loads states', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse(['ACRE'])))

    await expect(solarimetricApi.getStates()).resolves.toEqual(['ACRE'])
  })

  it('loads and validates the selected city', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse({
          id: 1,
          lon: -67.81,
          lat: -9.97,
          city: 'Rio Branco',
          class: 'Capital',
          state: 'ACRE',
          annual: 4620,
          jan: 4300,
          feb: 4200,
          mar: 4300,
          apr: 4200,
          may: 4100,
          jun: 4000,
          jul: 4100,
          aug: 4300,
          sep: 4600,
          oct: 4800,
          nov: 4800,
          dec: 4700
        })
      )
    )

    await expect(
      solarimetricApi.getCity('ACRE', 'Rio Branco')
    ).resolves.toMatchObject({
      city: 'Rio Branco',
      annual: 4620
    })
  })

  it('turns an API error into ApiError', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        jsonResponse(
          {
            error: {
              code: 'LOCATION_NOT_FOUND',
              message: 'Localidade não encontrada.'
            }
          },
          404
        )
      )
    )

    await expect(solarimetricApi.getStates()).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
      code: 'LOCATION_NOT_FOUND',
      message: 'Localidade não encontrada.'
    } satisfies Partial<ApiError>)
  })
})
