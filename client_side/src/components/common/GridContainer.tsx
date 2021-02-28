import { Row, Col } from 'antd'
import { forwardRef } from 'react'
import styled from 'styled-components'

interface GridContainerProps {
  rowStyle?: React.CSSProperties
  colStyle?: React.CSSProperties
}

const defaultRowStyle: React.CSSProperties = {
  position: 'relative',
  top: '64px',
  padding: '1rem'
}

const StyledRow = styled(Row)`
  transition: background-color 0.5s ease;
`

const GridContainer: React.FC<
  GridContainerProps & React.RefAttributes<HTMLDivElement>
> = forwardRef(({ children, rowStyle, colStyle }, ref) => {
  return (
    <StyledRow
      justify="center"
      style={{ ...defaultRowStyle, ...rowStyle }}
      ref={ref}
    >
      <Col xs={24} md={18} lg={14} xl={12} xxl={10} style={{ ...colStyle }}>
        {children}
      </Col>
    </StyledRow>
  )
})

export default GridContainer
