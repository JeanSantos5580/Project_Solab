import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <div className="max-w-7xl flex-col">
      <Header />
      <Outlet />
    </div>
  )
}
