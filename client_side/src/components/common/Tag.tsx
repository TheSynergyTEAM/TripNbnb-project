import { Tag, TagProps } from 'antd'
import { Component } from 'react'
import { purple } from '@ant-design/colors'

export default class ExtendTag extends Component<TagProps> {
  render() {
    return (
      <Tag {...this.props} color={purple.primary}>
        {this.props.children}
      </Tag>
    )
  }
}
