import { HeaderContainer, Logo, LogoContainer, MenuIcon } from './styles'
import logoSolab from '../../assets/logoSolab.png'
import { useState } from 'react'
import { Sidebar } from '../Sidebar'
import { DotsThreeOutlineVertical } from '@phosphor-icons/react'

export function Header() {
  const [openSidebar, setOpenSidebar] = useState(false)

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo src={logoSolab} />
      </LogoContainer>
      <MenuIcon onClick={handleOpenSidebar} />
      {openSidebar && <Sidebar active={setOpenSidebar} />}
    </HeaderContainer>
  )
}
