import { Component } from 'react'
import { Column } from './Bar'
import styled from 'styled-components'
import { Row, Col, Empty } from 'antd'
import SearchContext from 'context/Search'
import { PrimaryText } from 'components/common/typography'

const ResultContainer = styled.section`
  background-color: white;
  margin: 1.5rem 0;
`

const ResultHeader = styled.section`
  border-bottom: 1px solid #ddd;
  padding: 1rem;
`

const { Consumer: SearchConsumer } = SearchContext

class List extends Component {
  render() {
    return (
      <SearchConsumer>
        {(provide) => (
          <div>
            {provide.resultItem.length}, {provide.pagination?.totalCount}
          </div>
        )}
      </SearchConsumer>
    )
  }
}

class NoResult extends Component {
  render() {
    return (
      <SearchConsumer>
        {(provide) => (
          <Empty
            description={
              <strong>
                {provide.keyword
                  ? `${provide.keyword}에 대한 검색 결과가 없습니다.`
                  : '키워드로 검색을 해주세요.'}
              </strong>
            }
            style={{ padding: '1rem' }}
          />
        )}
      </SearchConsumer>
    )
  }
}
export default class Result extends Component {
  render() {
    return (
      <Row justify="center" gutter={10}>
        <Col {...Column}>
          <ResultContainer>
            <SearchConsumer>
              {(provide) =>
                provide.resultItem.length ? (
                  <>
                    <ResultHeader>
                      <PrimaryText style={{ fontWeight: 'bold' }}>
                        {provide.keyword}
                      </PrimaryText>
                      에 대한 검색 결과
                    </ResultHeader>
                    <List />
                  </>
                ) : (
                  <NoResult />
                )
              }
            </SearchConsumer>
          </ResultContainer>
        </Col>
      </Row>
    )
  }
}
