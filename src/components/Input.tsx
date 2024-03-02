import { InputHTMLAttributes } from 'react'

export function Input({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      className="w-full flex items-center rounded-lg h-12 px-2 border border-orange-600 cursor-pointer text-gray-400 focus: outline-none focus:ring"
    />
  )
}
