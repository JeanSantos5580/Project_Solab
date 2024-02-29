import { Route, Routes } from 'react-router-dom'
import { SolabSizer } from './pages/SolabSizer'
import { DefaultLayout } from './layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    element: <SolabSizer />
  }
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
