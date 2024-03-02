import { SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder: string
  data: string[]
}

export function SelectInput({ placeholder, data }: Props) {
  return (
    <select className="w-full flex items-center rounded-lg h-12 px-2 border border-orange-600 cursor-pointer text-gray-400 focus: outline-none focus:ring focus:ring-orange-400">
      <option value="" disabled selected className="disabled:text-gray-300">
        {placeholder}
      </option>
      {data?.map((state, key) => (
        <option key={key} value={state}>
          {state}
        </option>
      ))}
    </select>
  )
}
