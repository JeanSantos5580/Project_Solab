import { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  title: string
}

export function SidebarItem({ icon, title }: Props) {
  return (
    <div className="flex w-full h-fit rounded-lg items-center gap-4 size-4 text-gray-800 font-bold p-2 m-4 cursor-pointer hover:text-white hover:bg-orange-500 ">
      {icon}
      <span className="">{title}</span>
    </div>
  )
}
