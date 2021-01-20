import { Divider as AntDivider } from 'antd'
import styled from 'styled-components'

interface DividerProps {
  title: string | React.ReactNode
}

const StyledDivider = styled.div`
  margin: 5rem 0;
`

const StyledAntDivider = styled(AntDivider)`
  font-size: 1.25rem !important;
  border-top-color: rgba(0, 0, 0, 0.15) !important;
`

const Divider: React.FC<DividerProps> = ({ title, children }) => {
  return (
    <StyledDivider>
      <StyledAntDivider plain>{title}</StyledAntDivider>
      {children}
    </StyledDivider>
  )
}

export default Divider
