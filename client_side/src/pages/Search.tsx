import { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

export default class Search extends Component<RouteComponentProps> {
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return <div>search</div>
  }
}
