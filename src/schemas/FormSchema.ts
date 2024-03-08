import { z } from 'zod'
import { solarimetricDataSchema } from './SolarimetricData'

export const formSchema = z.object({
  solarimetricData: solarimetricDataSchema,
  connection_type: z.enum(['singlePhase', 'twoPhase', 'threePhase']),
  annual_consumption: z.coerce.number(),
  pannel_power: z.coerce.number()
})

export type FormSchema = z.infer<typeof formSchema>
