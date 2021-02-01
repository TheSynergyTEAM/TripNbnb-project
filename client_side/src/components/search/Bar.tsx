import { Button, Col, Input, Row } from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { purple } from '@ant-design/colors'
import { Component } from 'react'
import styled from 'styled-components'

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

  render() {
    return (
      <StyledBar>
        <Row justify="center" align="middle">
          <Col {...Column}>
            <Row align="middle" gutter={30}>
              <Col span={20}>
                <Input
                  size="large"
                  value={this.state.inputValue}
                  onChange={(e) => this.handleInputChange(e.target.value)}
                  prefix={<SearchOutlined style={{ color: purple.primary }} />}
                />
              </Col>
              <Col span={4}>
                <Button size="large" style={{ width: '100%' }}>
                  검색
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledBar>
    )
  }
}
