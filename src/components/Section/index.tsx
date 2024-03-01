import { ReactNode } from 'react'
import { SectionContainer, SectionContent, Title } from './styles'

type Props = {
  title: string
  children: ReactNode
}

export function Section({ title, children }: Props) {
  return (
    <SectionContainer>
      <Title>
        <h5>{title}</h5>
      </Title>
      <SectionContent>{children}</SectionContent>
    </SectionContainer>
  )
}
