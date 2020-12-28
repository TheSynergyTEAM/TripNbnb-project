import { useContext, useState } from 'react'
import UserContext from 'context/User'
import { Input, Button, notification } from 'antd'
import { reviews } from 'api'
import MarkerContext from 'context/Marker'

const placeholder = (isLoggedIn: boolean) =>
  isLoggedIn
    ? '리뷰를 작성해주세요. (최대 10자)'
    : '로그인이 필요한 서비스입니다.'

const openNotification = (content: string) =>
  notification.error({ message: content, placement: 'bottomRight' })

const ReviewsInput: React.FC = () => {
  const { detailItem } = useContext(MarkerContext)
  const { isLoggedIn, user } = useContext(UserContext)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleWriteReview = async () => {
    if (!isLoggedIn) {
      return openNotification('로그인이 필요한 서비스입니다.')
    }
    if (value.length < 10) {
      return openNotification('리뷰 내용은 10글자 이상이여야 합니다.')
    }
    if (loading) {
      return openNotification('다른 리뷰 작성 중에는 작성할 수 없습니다.')
    }

    setLoading(true)

    try {
      if (user) {
        await reviews.writeReview(user, {
          review: value,
          placeId: detailItem?.id,
          placeName: detailItem?.place_name,
          addressName: detailItem?.address_name,
          mapx: detailItem?.x,
          mapy: detailItem?.y
        })
      }
    } catch (error) {
      openNotification(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Input.TextArea
        value={value}
        style={{ margin: '1rem 0' }}
        autoSize={{ minRows: 3, maxRows: 7 }}
        onChange={(e) => setValue(e.target.value)}
        disabled={!isLoggedIn || loading}
        placeholder={placeholder(isLoggedIn)}
      />
      <Button
        block
        disabled={!value}
        loading={loading}
        type="primary"
        onClick={handleWriteReview}
      >
        리뷰 작성하기
      </Button>
    </>
  )
}

export default ReviewsInput
