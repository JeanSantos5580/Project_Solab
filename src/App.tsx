import { ThemeProvider } from 'styled-components'
import { themes } from './styles/theme'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <ThemeProvider theme={themes.light}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle/>
    </ThemeProvider>
  )
}
