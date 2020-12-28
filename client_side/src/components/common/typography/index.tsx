import { Typography } from 'antd'
import { purple } from '@ant-design/colors'

const defaultStyle: React.CSSProperties = {
  whiteSpace: 'break-spaces',
  marginBottom: 0
}

const Title: React.FC<any> = (props) => {
  return (
    <Typography.Title
      level={props.level || 4}
      style={{ ...defaultStyle, ...props.style }}
    >
      {props.children}
    </Typography.Title>
  )
}

const PrimaryText: React.FC<any> = (props) => {
  return (
    <Typography.Text style={{ ...defaultStyle, color: purple.primary }}>
      {props.children}
    </Typography.Text>
  )
}

const SecondaryText: React.FC<any> = (props) => {
  return (
    <Typography.Text
      type="secondary"
      style={{ ...defaultStyle, ...props.style }}
    >
      {props.children}
    </Typography.Text>
  )
}

export { Title, PrimaryText, SecondaryText }
