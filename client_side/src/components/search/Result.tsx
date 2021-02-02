import { Component } from 'react'
import { Column } from './Bar'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import { Title } from 'components/common/typography'

const ResultContainer = styled.section`
  background-color: white;
  margin: 1.5rem 0;
  padding: 1rem;
`

export default class Result extends Component {
  render() {
    return (
      <Row justify="center" gutter={10}>
        <Col {...Column}>
          <ResultContainer>
            <Title level={5}>Search Result</Title>
          </ResultContainer>
        </Col>
      </Row>
    )
  }
}
