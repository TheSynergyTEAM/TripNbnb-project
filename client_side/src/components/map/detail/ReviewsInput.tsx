import { useContext, useState } from 'react'
import UserContext from 'context/User'
import { Input, Button, notification, Rate } from 'antd'
import { writeReview } from 'api/reviews'
import MarkerContext from 'context/Marker'
import styled from 'styled-components'
import { purple } from '@ant-design/colors'
import PlaceDataHandler from 'context/PlaceDataHandler'

const placeholder = (isLoggedIn: boolean) =>
  isLoggedIn
    ? '리뷰를 작성해주세요. (최대 10자)'
    : '로그인이 필요한 서비스입니다.'

const openNotification = (content: string) =>
  notification.error({ message: content, placement: 'bottomRight' })

const StyledInputWrapper = styled.div`
  position: relative;
  margin-top: 2rem;
`

const StyledRate = styled(Rate)`
  position: absolute;
  bottom: 25px;
  left: 12px;
  font-size: 16px;
  color: ${purple[4]};
`

const ReviewsInput: React.FC = () => {
  const { detailItem } = useContext(MarkerContext)
  const { isLoggedIn, user } = useContext(UserContext)
  const placeDataHandler = useContext(PlaceDataHandler)
  const [value, setValue] = useState('')
  const [rateValue, setRateValue] = useState(5)
  const [loading, setLoading] = useState(false)

  const handleChangeRate = (_rateValue: number) => {
    setRateValue(_rateValue)
  }

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
        const updatedPlaceData = await writeReview(user, {
          review: value,
          placeId: detailItem?.id,
          placeName: detailItem?.place_name,
          addressName: detailItem?.address_name,
          mapx: detailItem?.x,
          mapy: detailItem?.y,
          rating: rateValue
        })
        placeDataHandler.updateCallback(updatedPlaceData.data)
      }
    } catch (error) {
      openNotification(error.message)
    } finally {
      setLoading(false)
      setRateValue(5)
      setValue('')
    }
  }

  return (
    <>
      <StyledInputWrapper>
        <Input.TextArea
          value={value}
          style={{
            margin: '1rem 0',
            paddingBottom: '2rem',
            position: 'relative'
          }}
          autoSize={{ minRows: 3, maxRows: 6 }}
          onChange={(e) => setValue(e.target.value)}
          disabled={!isLoggedIn || loading}
          placeholder={placeholder(isLoggedIn)}
        ></Input.TextArea>
        <StyledRate value={rateValue} onChange={handleChangeRate} allowHalf />
      </StyledInputWrapper>
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
