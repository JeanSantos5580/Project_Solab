import { SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder: string
  options: string[] | undefined
}

export function SelectInput({ placeholder, options, ...rest }: Props) {
  return (
    <select className="w-full flex items-center rounded-lg h-12 px-2 border border-orange-600 cursor-pointer text-gray-400 focus: outline-none focus:ring focus:ring-orange-400" {...rest}>
      <option value="" disabled selected className="disabled:text-gray-300">
        {placeholder}
      </option>
      {options?.map((state, key) => (
        <option key={key} value={state}>
          {state}
        </option>
      ))}
    </select>
  )
}
