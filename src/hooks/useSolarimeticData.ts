import { useEffect, useState } from 'react'
import { SolarimetricDataSchema } from '../schemas/SolarimetricData'
import { api } from '../lib/axios'

export const useSolarimetricData = () => {
  const [statesData, setStatesData] = useState<SolarimetricDataSchema[]>([])
  const [citiesData, setCitiesData] = useState<SolarimetricDataSchema[]>([])
  const [cityData, setCityData] = useState<SolarimetricDataSchema[]>([])

  const getStates = async () => {
    await api.get('/').then(response => {
      setStatesData(response.data)
    })
  }

  const getCitiesByState = (stateName: string) => {
    api.get(`/${stateName}`).then(response => {
      setCitiesData(response.data)
    })
  }

  const getCityData = (stateName: string, cityName: string) => {
    api.get(`/${stateName}/${cityName}`).then(response => {
      console.log('Response:', response.data)
      setCityData(response.data)
    })
  }
  
  useEffect(() => {
    getStates()
  }, [])

  return { statesData, citiesData, cityData, getCitiesByState, getCityData }
}
