import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:focus{
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.orange_500}
}

*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: ${(props) => props.theme.colors.gray_600};
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  background: ${(props) => props.theme.colors.gray_700};
  border-radius: 10px;
}


body{
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    -webkit-font-smoothing: antialiased;
}

body, input, textarea, button{
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    /* Short-hand -> font: 400 1rem Roboto, sans-serif */
}

@media screen and (max-width: 400px){
    body, input, textarea, button{
        font-size: 85%;
    }
}

@media screen and (min-width: 400px) and (max-width: 760px){
    body, input, textarea, button{
        font-size: 90%;
    }
}
`
