import styled from 'styled-components'

type DividerProps = {
  title: string | React.ReactNode
}

const StyledDivider = styled.div`
  /* 컨텐츠 묶음끼리의 간격 */
  margin-bottom: 5rem;
`

const StyledTitle = styled.div`
  /* 제목과 컨텐츠 간격 */
  margin-bottom: 1.5rem;
`

const Divider: React.FC<DividerProps> = ({ title, children }) => {
  return (
    <StyledDivider>
      <StyledTitle>
        <h2>{title}</h2>
      </StyledTitle>
      {children}
    </StyledDivider>
  )
}

export default Divider
