import { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

export default class SearchDetail extends Component<RouteComponentProps> {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return <div>search-detail</div>
  }
}
