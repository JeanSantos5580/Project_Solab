import { InputContainer } from './styles'

type Props = {
  placeholder: string
  data: string[]
}

export function Input({ placeholder, data }: Props) {
  return (
    <>
      <InputContainer name="" id="">
        <option value="" disabled selected>{placeholder}</option>
        {data?.map((state, key) => (
          <option key={key} value={state}>
            {state}
          </option>
        ))}
      </InputContainer>
    </>
  )
}
