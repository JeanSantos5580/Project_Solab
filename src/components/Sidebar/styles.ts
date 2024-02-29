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

export const Logo = styled.img`
  width: 133px;
  height: 40px;
  margin-right: 280px;

  /* @media screen and (min-width: 384px) and (max-width: 880px) {
    width: 80px;
    height: 25px;
  }

  @media screen and (min-width: 880px) {
  } */
`
export const Buttons = styled.div`
  display: flex;
  gap: 38px;
  margin-right: 174px;

  /* @media screen and (min-width: 384px) and (max-width: 880px) {
    display: none;
  }

  @media screen and (min-width: 880px) {
  } */
`

export const MenuButton = styled.button`
  border: none;
  background: transparent;

  font-family: 'General Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 155%;
  letter-spacing: 0.24px;

  color: ${({ theme }) => theme.colors.black};

  cursor: pointer;
`
