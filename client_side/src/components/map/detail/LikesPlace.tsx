import { Button } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useState } from 'react'

const LikesPlace: React.FC = () => {
  const [heart, setHeart] = useState<boolean>(false)

  const handleClick = () => {
    // test(heart)
    console.log(heart)
  }

  return (
    <Button
      shape="circle"
      type={heart ? 'primary' : 'default'}
      icon={
        heart ? <HeartFilled style={{ color: 'white' }} /> : <HeartOutlined />
      }
      onClick={handleClick}
    />
  )
}

export default LikesPlace
