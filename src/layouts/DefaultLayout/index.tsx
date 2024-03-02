import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export function DefaultLayout() {
  return (
    <div className="max-w-7xl flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
