import { z } from 'zod'

export const panelPowerSchema = z.coerce
  .number({ invalid_type_error: 'Selecione a potência do módulo.' })
  .positive('Selecione a potência do módulo.')

export const formSchema = z.object({
  state: z.string().trim().min(1, 'Selecione um estado.'),
  city: z.string().trim().min(1, 'Selecione um município.'),
  annual_consumption: z.coerce
    .number({ invalid_type_error: 'Informe o consumo anual de energia.' })
    .positive('O consumo anual deve ser maior que zero.'),
  pannel_power: panelPowerSchema
})

export type FormSchema = z.infer<typeof formSchema>
