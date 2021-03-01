import { Col } from 'antd'
import styled from 'styled-components'

type FlexItemProps = {
  isCenter?: boolean
}

const span = {
  xs: 24,
  lg: 12
}

const StyledTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 900;
`

const FlexItem: React.FC<FlexItemProps> = ({ children, isCenter = false }) => {
  return (
    <Col
      {...span}
      style={{
        textAlign: isCenter ? 'center' : 'initial'
      }}
    >
      {children}
    </Col>
  )
}

export const FlexItemTitle: React.FC = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>
}

export default FlexItem
