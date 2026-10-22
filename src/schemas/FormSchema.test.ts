import { describe, expect, it } from 'vitest'
import { formSchema } from './FormSchema'

describe('formSchema', () => {
  it('accepts a valid payload', () => {
    const result = formSchema.safeParse({
      state: 'AMAPÁ',
      city: 'Macapá',
      annual_consumption: '3650',
      pannel_power: '550'
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.annual_consumption).toBe(3650)
      expect(result.data.pannel_power).toBe(550)
    }
  })

  it('rejects empty location fields', () => {
    const result = formSchema.safeParse({
      state: '',
      city: '',
      annual_consumption: '3650',
      pannel_power: '550'
    })

    expect(result.success).toBe(false)
  })

  it('rejects non-positive consumption', () => {
    expect(
      formSchema.safeParse({
        state: 'AMAPÁ',
        city: 'Macapá',
        annual_consumption: '0',
        pannel_power: '550'
      }).success
    ).toBe(false)
  })
})
