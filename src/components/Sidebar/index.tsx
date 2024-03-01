import { Calculator, House, X } from '@phosphor-icons/react'
import { SidebarItem } from './SidebarItem'
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
      <div className="animate-wiggle bg-gray-900 opacity-70 fixed inset-0 w-full h-screen"></div>
      <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-md">
        <X
          size={32}
          className="fixed text-gray-950 w-7 h-7 ml-6 mt-6 cursor-pointer"
          onClick={handleCloseSidebar}
        />
        <div className="flex-col mt-24 space-y-2">
          <NavLink
            to="/home"
            onClick={handleCloseSidebar}
            className="decoration-transparent"
          >
            <SidebarItem
              icon={<House size={32} weight="regular" />}
              title="Home"
            />
          </NavLink>
          <NavLink
            to="/solabSizer"
            onClick={handleCloseSidebar}
            className="decoration-transparent"
          >
            <SidebarItem icon={<Calculator size={32} />} title="Solab Sizer" />
          </NavLink>
        </div>
      </div>
    </>
  )
}
