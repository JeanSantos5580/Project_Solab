import { z } from 'zod'

export const solarimetricDataSchema = z.object({
  lon: z.number(),
  lat: z.number(),
  city: z.string(),
  class: z.string(),
  state: z.string(),
  annual: z.number(),
  jan: z.number(),
  feb: z.number(),
  mar: z.number(),
  apr: z.number(),
  may: z.number(),
  jun: z.number(),
  jul: z.number(),
  aug: z.number(),
  sep: z.number(),
  oct: z.number(),
  nov: z.number(),
  dec: z.number()
})

export type SolarimetricDataSchema = z.infer<typeof solarimetricDataSchema>
