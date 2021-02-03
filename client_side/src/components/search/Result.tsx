import { Component } from 'react'
import { Column } from './Bar'
import styled from 'styled-components'
import { Row, Col, Empty } from 'antd'
import SearchContext from 'context/Search'

const ResultContainer = styled.section`
  background-color: white;
  margin: 1.5rem 0;
  padding: 1rem;
`

const { Consumer: SearchConsumer } = SearchContext

export default class Result extends Component {
  render() {
    return (
      <Row justify="center" gutter={10}>
        <Col {...Column}>
          <ResultContainer>
            <SearchConsumer>
              {(provide) =>
                provide.resultItem.length ? (
                  <div>data !</div>
                ) : (
                  <Empty description="데이터가 없습니다." />
                )
              }
            </SearchConsumer>
          </ResultContainer>
        </Col>
      </Row>
    )
  }
}
