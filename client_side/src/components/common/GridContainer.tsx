import { Row, Col } from 'antd'

interface GridContainerProps {
  rowStyle?: React.CSSProperties
  colStyle?: React.CSSProperties
}

const defaultRowStyle: React.CSSProperties = {
  position: 'relative',
  top: '64px',
  padding: '1rem'
}

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  rowStyle,
  colStyle
}) => {
  return (
    <Row justify="center" style={{ ...rowStyle, ...defaultRowStyle }}>
      <Col xs={24} md={18} lg={14} xl={12} xxl={10} style={{ ...colStyle }}>
        {children}
      </Col>
    </Row>
  )
}

export default GridContainer
