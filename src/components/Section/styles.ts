import styled from 'styled-components'

export const SectionContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const Title = styled.header`
  flex: 1;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => theme.colors.orange_500};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  letter-spacing: 0.5px;
`
export const SectionContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.gray_100};
`
