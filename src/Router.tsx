import { Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { Report } from './pages/Report'
import { SolabSizer } from './pages/SolabSizer'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<SolabSizer />} />
        <Route path="solabSizer" element={<SolabSizer />} />
        <Route path="home" element={<Home />} />
        <Route path="report" element={<Report />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
