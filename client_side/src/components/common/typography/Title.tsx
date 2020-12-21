import { Typography } from 'antd'

const defaultStyle = {
  whiteSpace: 'break-spaces'
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

export { Title }
