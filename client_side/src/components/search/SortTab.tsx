import { Col, Row } from 'antd'
import { Column } from 'components/search/Bar'
import SearchDetailContext from 'context/SearchDetail'
import { useContext } from 'react'
import styled from 'styled-components'

const StyledTab = styled.div`
  margin-top: 0.5rem;
`

const filtering = [
  {
    action: 'AT4',
    name: '관광명소'
  },
  {
    action: 'AD5',
    name: '숙박'
  },
  {
    action: 'FD6',
    name: '음식점'
  }
]

const SortTab: React.FC = () => {
  const { customPlace } = useContext(SearchDetailContext)

  return (
    <Row justify="center">
      <Col {...Column}>
        <StyledTab>asdfg</StyledTab>
      </Col>
    </Row>
  )
}

export default SortTab
