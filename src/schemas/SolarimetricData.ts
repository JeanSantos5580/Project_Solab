import { z } from 'zod'

export const solarimetricDataSchema = z.object({
  id: z.number().optional(),
  lon: z.number().nullable(),
  lat: z.number().nullable(),
  city: z.string(),
  class: z.string().nullable(),
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

export type SolarimetricData = z.infer<typeof solarimetricDataSchema>
