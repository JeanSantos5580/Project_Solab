import { DotsThreeOutlineVertical } from '@phosphor-icons/react'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  padding: 16px 0;
  margin-bottom: 2.5rem;
`

export const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Logo = styled.img`
  width: 100%;
  max-width: 150px;
`

export const MenuIcon = styled(DotsThreeOutlineVertical).attrs(({ theme }) => ({
  color: theme.colors.orange_600,
  size: 24,
  weight: 'fill'
}))``
