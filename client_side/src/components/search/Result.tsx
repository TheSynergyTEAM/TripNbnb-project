import { Component, PureComponent } from 'react'
import { Column } from './Bar'
import styled from 'styled-components'
import { Row, Col, Empty, Spin } from 'antd'
import SearchContext from 'context/Search'
import { PrimaryText } from 'components/common/typography'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'

const ResultContainer = styled.section`
  background-color: white;
  margin: 1.5rem 0;
`

const ResultHeader = styled.section`
  border-bottom: 1px solid #ddd;
  padding: 1rem;
`

const { Consumer: SearchConsumer } = SearchContext

interface ResultWrapperState {
  open: boolean
  itemLength: number
}

class ResultWrapper extends Component<any, ResultWrapperState> {
  constructor(props: any) {
    super(props)

    this.state = {
      open: false,
      itemLength: 0
    }
  }

  triggerOpen() {
    this.setState((state) => ({ ...state, open: !state.open }))
  }

  render() {
    return <div>{this.state.open ? <div>opened</div> : <div>closed</div>}</div>
  }
}

class LoadingSpin extends PureComponent {
  render() {
    return (
      <Spin
        style={{
          padding: '1rem',
          margin: '0 auto',
          textAlign: 'center',
          display: 'block'
        }}
        indicator={<LoadingOutlined spin />}
      />
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
                    <ResultWrapper />
                  </>
                ) : provide.loading ? (
                  <LoadingSpin />
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
