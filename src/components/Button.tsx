import { ReactNode } from 'react'

type Props = {
  title: string
  icon: ReactNode
}

export function Button({ title, icon }: Props) {
  return (
    <button className="w-full flex items-center gap-3 font-bold rounded-lg text-sm text-white justify-center py-2  bg-orange-400 hover:bg-orange-500 transition-all">
      {title}
      {icon}
    </button>
  )
}
