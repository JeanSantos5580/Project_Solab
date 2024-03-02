import { Route, Routes } from 'react-router-dom'
import { SolabSizer } from './pages/SolabSizer'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { Report } from './pages/Report'

const routes = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/solabSizer',
    element: <SolabSizer />
  },
  {
    path: '/report',
    element: <Report />
  },
]

export function Router() {
  return (
    <Routes>
      <Route path={'/'} element={<DefaultLayout />}>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}
