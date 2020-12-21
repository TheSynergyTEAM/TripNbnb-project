import { Card, Skeleton, Typography, Rate } from 'antd'

interface ContentProps {
  loading: boolean
  style?: React.CSSProperties
  rating?: number
  reviewCount?: number
  markerPlace?: ResultItem | any
}

const CoverImage = () => (
  <img src="https://picsum.photos/200/150" alt="placeholder" />
)

const Title: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Typography.Title
      level={5}
      style={{ whiteSpace: 'break-spaces', marginBottom: 0 }}
    >
      {title}
    </Typography.Title>
  )
}

const Description: React.FC<{ rating?: number; reviewCount?: number }> = ({
  rating,
  reviewCount
}) => {
  return (
    <>
      <Rate
        allowHalf
        disabled
        defaultValue={rating}
        style={{ display: 'block' }}
      />
      <Typography.Link underline>리뷰 {reviewCount}개</Typography.Link>
    </>
  )
}

const Content: React.FC<ContentProps> = ({
  rating,
  reviewCount,
  loading = false,
  style,
  markerPlace
}) =>
  loading ? (
    <Card style={{ width: '200px' }}>
      <Skeleton loading={true} active round title />
    </Card>
  ) : (
    <Card
      style={{ ...style, width: '200px' }}
      cover={<CoverImage />}
      size="small"
    >
      <Card.Meta
        title={<Title title={markerPlace?.place_name || 'no title'} />}
        description={<Description rating={rating} reviewCount={reviewCount} />}
      />
    </Card>
  )

export default Content
