import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiError, isAbortError, solarimetricApi } from '../lib/http'
import { SolarimetricData } from '../schemas/SolarimetricData'

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error && error.name === 'ZodError') {
    return 'O servidor retornou dados em formato inesperado.'
  }

  return 'Não foi possível carregar os dados. Tente novamente.'
}

export function useSolarimetricData() {
  const [states, setStates] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [cityData, setCityData] = useState<SolarimetricData | null>(null)

  const [statesLoading, setStatesLoading] = useState(true)
  const [citiesLoading, setCitiesLoading] = useState(false)
  const [cityLoading, setCityLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const citiesController = useRef<AbortController | null>(null)
  const cityController = useRef<AbortController | null>(null)

  const loadStates = useCallback(async (signal?: AbortSignal) => {
    setStatesLoading(true)
    setError(null)

    try {
      const data = await solarimetricApi.getStates(signal)
      setStates(data)
    } catch (requestError) {
      if (!isAbortError(requestError)) {
        setError(getErrorMessage(requestError))
      }
    } finally {
      if (!signal?.aborted) {
        setStatesLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void loadStates(controller.signal)

    return () => controller.abort()
  }, [loadStates])

  useEffect(() => {
    return () => {
      citiesController.current?.abort()
      cityController.current?.abort()
    }
  }, [])

  const getCitiesByState = useCallback(async (state: string) => {
    citiesController.current?.abort()
    cityController.current?.abort()

    const controller = new AbortController()
    citiesController.current = controller

    setCities([])
    setCityData(null)
    setCitiesLoading(true)
    setCityLoading(false)
    setError(null)

    try {
      const data = await solarimetricApi.getCities(state, controller.signal)
      setCities(data)
    } catch (requestError) {
      if (!isAbortError(requestError)) {
        setError(getErrorMessage(requestError))
      }
    } finally {
      if (!controller.signal.aborted) {
        setCitiesLoading(false)
      }
    }
  }, [])

  const getCityData = useCallback(async (state: string, city: string) => {
    cityController.current?.abort()

    const controller = new AbortController()
    cityController.current = controller

    setCityData(null)
    setCityLoading(true)
    setError(null)

    try {
      const data = await solarimetricApi.getCity(state, city, controller.signal)
      setCityData(data)
    } catch (requestError) {
      if (!isAbortError(requestError)) {
        setError(getErrorMessage(requestError))
      }
    } finally {
      if (!controller.signal.aborted) {
        setCityLoading(false)
      }
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  const clearCityData = useCallback(() => {
    cityController.current?.abort()
    setCityData(null)
    setCityLoading(false)
    setError(null)
  }, [])

  const clearLocation = useCallback(() => {
    citiesController.current?.abort()
    cityController.current?.abort()
    setCities([])
    setCityData(null)
    setCitiesLoading(false)
    setCityLoading(false)
    setError(null)
  }, [])

  return {
    states,
    cities,
    cityData,
    statesLoading,
    citiesLoading,
    cityLoading,
    error,
    getCitiesByState,
    getCityData,
    clearError,
    clearCityData,
    clearLocation
  }
}
