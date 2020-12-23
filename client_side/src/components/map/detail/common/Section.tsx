import { Card } from 'antd'

const Section: React.FC<any> = (props) => {
  return (
    <Card {...props} bordered={false}>
      {props.children}
    </Card>
  )
}

export default Section
