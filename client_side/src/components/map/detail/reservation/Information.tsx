import { InputNumber, Select } from 'antd'
import { SecondaryText } from 'components/common/typography'
import { Component } from 'react'
import styled from 'styled-components'

interface InformationProps {
  peopleCount: number
  onChangePeopleCount: Function
  selectOptions: Array<{ name: string; price: number }>
  setSelectValue: Function
}

const StyledWrapper = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  margin: 1rem 0;
  list-style: none;
  padding: 0;
`

const StyledItem = styled.li`
  padding: 0;
  margin-right: 1rem;

  & .placeholder {
    margin-bottom: 7px !important;
  }
`

const Placeholder = (props: any) => (
  <SecondaryText
    role="placeholder"
    className="placeholder"
    style={{ display: 'block' }}
  >
    {props.children}
  </SecondaryText>
)

class Information extends Component<InformationProps> {
  handleChange = (value?: string | number | null) => {
    this.props.onChangePeopleCount(value)
  }

  render() {
    return (
      <StyledWrapper>
        <StyledItem>
          <Placeholder>인원 수(명)</Placeholder>
          <InputNumber
            min={1}
            max={20}
            value={this.props.peopleCount}
            onChange={this.handleChange}
          />
        </StyledItem>
        <StyledItem>
          <Placeholder>방 종류</Placeholder>
          <Select
            defaultValue={this.props.selectOptions[0].name}
            onChange={(value: string) =>
              this.props.setSelectValue(
                this.props.selectOptions.find((option) => option.name === value)
              )
            }
            style={{ width: '110px' }}
          >
            {this.props.selectOptions.map((option) => (
              <Select.Option value={option.name} key={option.name}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        </StyledItem>
      </StyledWrapper>
    )
  }
}

export default Information
