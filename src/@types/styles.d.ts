import 'styled-components'
import { commonStyles } from '../styles/theme/common'

type ThemeType = typeof commonStyles

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
