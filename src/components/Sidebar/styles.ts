import styled, { keyframes } from 'styled-components'

const showSidebar = keyframes`
  0% {
    opacity: 0;
    width: 0
  }
  100% {
    opacity: 1;
    width: 300px
  }
`
export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 18.75rem;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.2);

  animation: ${showSidebar} 0.2s ease-in-out;

  > svg {
    position: fixed;
    color: ${({ theme }) => theme.colors.black};
    width: 30px;
    height: 30px;
    margin-left: 24px;
    margin-top: 24px;
    cursor: pointer;
  }
`

export const Content = styled.div`
  margin-top: 100px;

  > a {
    text-decoration: none;
  }
`
export const Background = styled.div`
  background: ${({ theme }) => theme.colors.black};
  opacity: 0.7;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
`
