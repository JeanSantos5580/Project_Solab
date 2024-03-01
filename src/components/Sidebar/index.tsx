import { Calculator, House, X } from '@phosphor-icons/react'
import { SidebarItem } from './SidebarItem'
import { Background, Content, SidebarContainer } from './styles'
import { NavLink } from 'react-router-dom'
type Props = {
  active: (isOpen: boolean) => void
}
export function Sidebar({ active }: Props) {
  const handleCloseSidebar = () => {
    active(false)
  }
  return (
    <>
      <Background></Background>
      <SidebarContainer>
        <X size={32} onClick={handleCloseSidebar} />
        <Content>
          <NavLink to="/home" onClick={handleCloseSidebar}>
            <SidebarItem icon={<House size={32} weight="regular" />} title="Home" />
          </NavLink>
          <NavLink to="/solabSizer" onClick={handleCloseSidebar}>
            <SidebarItem icon={<Calculator size={32} />} title="Solab Sizer" />
          </NavLink>
        </Content>
      </SidebarContainer>
    </>
  )
}
