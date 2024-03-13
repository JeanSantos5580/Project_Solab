import { z } from 'zod'

export const formSchema = z.object({
  state: z.string(),
  city: z.string(),
  annual_consumption: z.coerce.number().max(75000),
  pannel_power: z.coerce.number()
})

export type FormSchema = z.infer<typeof formSchema>
