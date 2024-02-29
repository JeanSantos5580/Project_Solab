export const commonStyles = {
  colors: {
    white: '#fff',
    black: '#000',

    gray_100: '#E1E1E6',
    gray_300: '#C4C4CC',
    gray_400: '#8D8D99',
    gray_500: '#7C7C8A',
    gray_600: '#323238',
    gray_700: '#29292E',
    gray_800: '#202024',
    gray_900: '#121214',

    
    orange_300: '#FF8E50',
    orange_500: '#FE5C11',
    orange_600: '#EF4107',

    success: '#17bf28',
    warning: '#ec942c',
    error: '#e52323'
  } as const,

  fontSize: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18
  } as const,

  borderRadius: {
    md: 10
  } as const
}
