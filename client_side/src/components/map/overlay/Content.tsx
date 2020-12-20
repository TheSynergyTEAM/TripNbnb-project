import { Card, Skeleton } from 'antd'

interface ContentProps {
  title?: string
  rating?: number
  reviewCount?: number
  loading: boolean
  style?: React.CSSProperties
}

const CoverImage = () => (
  <img src="https://picsum.photos/200/150" alt="placeholder" />
)

const Content: React.FC<ContentProps> = (props) => {
  return (
    <Card style={{ ...props.style, width: '200px' }} cover={<CoverImage />}>
      <Skeleton loading={props.loading} active>
        <Card.Meta
          title={props.title || '제목'}
          description={props.rating || '평점'}
        />
      </Skeleton>
    </Card>
  )
}

export default Content
