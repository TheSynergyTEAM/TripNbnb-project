import { Card, Skeleton, Typography, Rate, Image } from 'antd'
import { Title } from 'components/common/typography'

interface ContentProps {
  loading: boolean
  style?: React.CSSProperties
  rating?: number | string
  reviewCount?: number
  markerPlace?: ResultItem | any
  image?: string
}

const CoverImage: React.FC<{ src: string }> = ({ src }) => {
  return src ? <Image src={src} width={200} height={150} /> : null
}

const Description: React.FC<{
  rating?: number | string
  reviewCount?: number
}> = ({ rating, reviewCount }) => {
  return rating ? (
    <>
      <Rate
        allowHalf
        disabled
        defaultValue={parseFloat(rating.toString())}
        style={{ display: 'block' }}
      />
      <Typography.Link underline>리뷰 {reviewCount}개</Typography.Link>
    </>
  ) : null
}

const Content: React.FC<ContentProps> = ({
  rating,
  reviewCount,
  loading = false,
  style,
  markerPlace,
  image = ''
}) =>
  loading ? (
    <Card style={{ width: '200px' }}>
      <Skeleton loading={true} active round title />
    </Card>
  ) : (
    <Card
      style={{ ...style, width: '200px' }}
      cover={<CoverImage src={image} />}
      size="small"
    >
      <Card.Meta
        title={
          <Title level={5} style={{ marginBottom: 0 }}>
            {markerPlace?.place_name}
          </Title>
        }
        description={<Description rating={rating} reviewCount={reviewCount} />}
      />
    </Card>
  )

export default Content
