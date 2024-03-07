import logoSolab from '../assets/logoSolab.png'
import { useState } from 'react'
import { DotsThreeVertical } from '@phosphor-icons/react'
import { Sidebar } from './Sidebar'

export function Header() {
  const [openSidebar, setOpenSidebar] = useState(false)

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar)
  }
  return (
    <header className="flex justify-between items-center h-16 shadow-md py-4 mb-10 sm:rounded-md">
      <div className="flex flex-1 justify-center items-center">
        <img src={logoSolab} className="w-full max-w-28" />
      </div>
      <DotsThreeVertical
        weight="bold"
        className="w-8 h-8 text-orange-600 cursor-pointer"
        onClick={handleOpenSidebar}
      />
      {openSidebar && <Sidebar active={setOpenSidebar} />}
    </header>
  )
}
