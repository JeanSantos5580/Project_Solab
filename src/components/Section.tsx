import { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export function Section({ title, children }: Props) {
  return (
    <section className="w-full flex-col">
      <header className="flex-1 p-4 bg-orange-500 text-white font-bold tracking-wide">
        <h5>{title}</h5>
      </header>
      <div className='flex-1 flex-col p-6 bg-gray-100 space-y-8'>{children}</div>
    </section>
  )
}
