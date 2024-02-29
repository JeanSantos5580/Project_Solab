import styled from 'styled-components'

export const ContainerSidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray_800};
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  margin: 0 15px 15px;
  cursor: pointer;

  > svg {
    width: 24px;
    color: ${({ theme }) => theme.colors.gray_800};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.orange_500};

    > svg {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`
