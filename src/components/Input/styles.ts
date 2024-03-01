import styled from 'styled-components'

export const InputContainer = styled.select`
  width: 100%;
  display: flex;
  height: 48px;
  padding: 0 1rem;
  border: 1px solid ${({ theme }) => theme.colors.orange_500};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray_500};
  cursor: pointer;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_300};
  }

  option[disabled] {
    color: ${({ theme }) => theme.colors.gray_300};
  }
`
