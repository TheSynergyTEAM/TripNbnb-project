import { Button, Col, Input, Row } from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { purple } from '@ant-design/colors'
import { Component } from 'react'
import styled from 'styled-components'
import SearchContext from 'context/Search'
import { SearchState } from 'pages/Search'
import { fetchPlaceThumbnailDataByResult } from 'components/map/hooks/FetchPlace'
import { RouteComponentProps, withRouter } from 'react-router-dom'

type Place = daum.maps.services.Places

type SearchBarState = {
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

class SearchBar extends Component<RouteComponentProps, SearchBarState> {
  static contextType = SearchContext

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
        place: new daum.maps.services.Places(),
        isPlace: true
      }))
    }

    if (this.props.location.search) {
      const { search } = this.props.location

      if (search.includes('keyword')) {
        const keyword = decodeURIComponent(search.split('keyword=')[1])

        this.setState({ inputValue: keyword }, () => {
          this.handleSearch(this.context)
        })
      }
    }
  }

  handleInputChange = (v: string) => {
    this.setState((state) => ({
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
    provide.setLoading(true)

    this.props.history.push({
      pathname: '/search',
      search: `keyword=${this.state.inputValue}`
    })

    this.state.place.keywordSearch(
      this.state.inputValue,
      async (result, status, pagination) => {
        if (status === daum.maps.services.Status.OK) {
          const places = await fetchPlaceThumbnailDataByResult(result)

          provide.setSearchResult([...places], this.state.inputValue)
          provide.setPagination(pagination)
          provide.setLoading(false)

          this.setState({ isLoading: false })
        } else {
          // 검색 결과가 없을 때
          provide.setSearchResult([], this.state.inputValue)
          provide.setLoading(false)
        }
      }
    )

    this.setState({ isLoading: false })
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

export default withRouter(SearchBar)
