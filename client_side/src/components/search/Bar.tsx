import { Button, Col, Input, Row } from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { purple } from '@ant-design/colors'
import { Component } from 'react'
import styled from 'styled-components'
import SearchContext from 'context/Search'
import { SearchState } from 'pages/Search'

type Place = daum.maps.services.Places

type SearchBarProps = {
  inputValue: string
  place: Place | null
  isPlace: boolean
  isLoading: boolean
}

const StyledBar = styled.section`
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 20;
`

export const Column = {
  xs: 24,
  sm: 18,
  md: 16,
  lg: 14,
  xl: 12,
  xxl: 10
}

const { Consumer: SearchConsumer } = SearchContext

export default class SearchBar extends Component<{}, SearchBarProps> {
  constructor(props: any) {
    super(props)

    this.state = {
      inputValue: '',
      place: null,
      isPlace: false,
      isLoading: false
    }
  }

  componentDidMount() {
    if (window.daum) {
      this.setState((state) => ({
        ...state,
        place: new daum.maps.services.Places(),
        isPlace: true
      }))
    }
  }

  handleInputChange = (v: string) => {
    this.setState((state) => ({
      ...state,
      inputValue: v
    }))
  }

  handleSearch = (provide: SearchState) => {
    if (!this.state.isPlace || !this.state.inputValue || !this.state.place) {
      return
    }

    this.setState({ isLoading: true })

    provide.setSearchResult([], this.state.inputValue)
    provide.setPagination(null)

    this.state.place.keywordSearch(
      this.state.inputValue,
      (result, status, pagination) => {
        if (status === daum.maps.services.Status.OK) {
          provide.setSearchResult([...result], this.state.inputValue)
          provide.setPagination(pagination)

          this.setState({ isLoading: false })
        } else {
          // 검색 결과가 없을 때
          provide.setSearchResult([], this.state.inputValue)
        }
      }
    )

    this.setState({ isLoading: false })

    // provide.setSearchResult(
    //   [
    //     {
    //       address_name: '경기 성남시 분당구 서현동 261-1',
    //       // @ts-expect-error
    //       category_group_code: 'AD5',
    //       category_group_name: '숙박',
    //       category_name: '여행 > 숙박 > 호텔',
    //       distance: '1203',
    //       id: '978338074',
    //       phone: '1877-8006',
    //       place_name: '서머셋센트럴분당',
    //       place_url: 'http://place.map.kakao.com/978338074',
    //       road_address_name: '경기 성남시 분당구 황새울로311번길 36',
    //       x: '127.121207244573',
    //       y: '37.3865566748732'
    //     }
    //   ],
    //   this.state.inputValue
    // )
  }

  render() {
    return (
      <StyledBar>
        <Row justify="center" align="middle">
          <Col {...Column}>
            <Row align="middle" gutter={10}>
              <SearchConsumer>
                {(provide) => (
                  <>
                    <Col span={20}>
                      <Input
                        disabled={!this.state.isPlace || this.state.isLoading}
                        size="large"
                        value={this.state.inputValue}
                        onChange={(e) => this.handleInputChange(e.target.value)}
                        prefix={
                          <SearchOutlined style={{ color: purple.primary }} />
                        }
                        onPressEnter={(e) => this.handleSearch(provide)}
                        placeholder="장소를 입력하세요"
                      />
                    </Col>
                    <Col span={4}>
                      <Button
                        size="large"
                        style={{ width: '100%' }}
                        onClick={(e) => this.handleSearch(provide)}
                        disabled={!this.state.isPlace || this.state.isLoading}
                      >
                        검색
                      </Button>
                    </Col>
                  </>
                )}
              </SearchConsumer>
            </Row>
          </Col>
        </Row>
      </StyledBar>
    )
  }
}
