import { ReactNode } from 'react'
import { ContainerSidebarItem } from './styles'

type Props = {
  icon: ReactNode
  title: string
}

export function SidebarItem({ icon, title }: Props) {
  return (
    <ContainerSidebarItem>
      {icon}
      <span>{title}</span>
    </ContainerSidebarItem>
  )
}
