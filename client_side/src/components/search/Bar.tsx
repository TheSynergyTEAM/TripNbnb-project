import { Button, Col, Input, Row } from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { purple } from '@ant-design/colors'
import { Component } from 'react'
import styled from 'styled-components'
import SearchContext from 'context/Search'

type SearchBarProps = {
  inputValue: string
}

const StyledBar = styled.section`
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #ddd;
`

export const Column = {
  xs: 24,
  sm: 18,
  md: 14,
  lg: 12,
  xl: 10,
  xxl: 8
}

const { Consumer: SearchConsumer } = SearchContext

export default class SearchBar extends Component<{}, SearchBarProps> {
  constructor(props: any) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  handleInputChange = (v: string) => {
    this.setState((state) => ({
      ...state,
      inputValue: v
    }))
  }

  handleSearch = (provide: any) => {
    console.log(this.state.inputValue, provide)
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
