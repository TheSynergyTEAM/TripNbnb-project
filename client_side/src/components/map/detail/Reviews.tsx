import React, { useCallback, useContext, useEffect, useState } from 'react'
import Section from 'components/map/detail/common/Section'
import { SecondaryText, Title } from 'components/common/typography'
import { List, Modal, notification, Rate, Space, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import styled from 'styled-components'
import dayjs from 'api/date'
import ReviewsTabs from 'components/map/detail/ReviewsTab'
import ReviewsInput from 'components/map/detail/ReviewsInput'
import { ReviewData } from 'components/map/hooks/FetchPlace'
import UserContext from 'context/User'
import { deleteReivew, updateReview } from 'api/reviews'

interface ReviewsComponentProps {
  reviews: Array<ReviewData>
}

function useReviewOwner(review: ReviewData) {
  const { user } = useContext(UserContext)

  if (!user) {
    return false
  } else {
    return user.id === parseInt(review.user_id)
  }
}

const StyledListItemMeta = styled(List.Item.Meta)`
  & .ant-list-item-meta-title {
    margin-bottom: 0;
  }
`

const ReviewAction: React.FC<{
  review: ReviewData
  deleteReview: Function
  index: number
  disabled: boolean
}> = ({ review, index, deleteReview, disabled }) => {
  const isOwner = useReviewOwner(review)

  const handleDeleteModal = () => {
    Modal.confirm({
      title: '리뷰를 삭제할까요?',
      okText: '삭제',
      cancelText: '취소',
      onOk: () => deleteReview(review, index)
    })
  }

  return isOwner ? (
    <>
      <Typography.Link disabled={disabled} onClick={handleDeleteModal}>
        삭제
      </Typography.Link>
    </>
  ) : null
}

const Reviews: React.FC<ReviewsComponentProps> = ({ reviews }) => {
  const [isSpread, setIsSpread] = useState(false)
  const [tabActive, setTabActive] = useState(0)
  const [editing, setEditing] = useState(false)
  const { user } = useContext(UserContext)
  const isOverflow = reviews.length > 5

  const slicedReviews = useCallback(() => {
    switch (tabActive) {
      case 0:
        reviews.sort((a, b) => b.date - a.date)
        break
      case 1:
        reviews.sort((a, b) => (a.rating > b.rating ? -1 : 1))
        break
      case 2:
        reviews.sort((a, b) => (a.rating > b.rating ? 1 : -1))
        break
    }
    if (!isSpread) {
      return reviews.slice(0, 5)
    }
    return reviews
  }, [isSpread, reviews, tabActive])

  const handleTabChange = (value: number) => {
    if (tabActive === value) {
      return
    }
    setTabActive(value)
  }

  const handleReviewChange = async (text: string, index: number) => {
    if (text === reviews[index].content || !user) {
      return
    }

    setEditing(true)

    try {
      await updateReview(user, text, reviews[index])
      reviews[index].content = text
    } catch (error) {
      return notification.error({
        message: error.message,
        placement: 'topLeft'
      })
    } finally {
      setEditing(false)
    }
  }

  const handleReviewDelete = async (review: ReviewData, index: number) => {
    if (index < 0 || !user) return

    if (
      reviews.findIndex((item) => item.review_id === review.review_id) !== -1
    ) {
      setEditing(true)
      try {
        await deleteReivew(user, review)
        reviews.splice(index, 1)
      } catch (error) {
        notification.error({
          message: error.message,
          placement: 'topLeft'
        })
      } finally {
        setEditing(false)
      }
    }
  }

  useEffect(() => {
    return () => {
      setIsSpread(false)
      setEditing(false)
      setTabActive(0)
    }
  }, [])

  return (
    <Section title={<Title level={5}>리뷰</Title>}>
      {reviews.length ? (
        <>
          <ReviewsTabs active={tabActive} onChange={handleTabChange} />
          <List
            dataSource={slicedReviews()}
            itemLayout="vertical"
            renderItem={(review, index) => (
              <List.Item
                actions={[
                  <ReviewAction
                    disabled={editing}
                    index={index}
                    review={review}
                    deleteReview={handleReviewDelete}
                  />
                ]}
              >
                <StyledListItemMeta
                  avatar={<Avatar src={review.user_profile} size="default" />}
                  title={
                    <>
                      <span>{review.username}</span>
                      <SecondaryText
                        style={{ marginLeft: '0.5rem', fontSize: '14px' }}
                      >
                        {dayjs(new Date(review.date)).fromNow()}
                      </SecondaryText>
                    </>
                  }
                  description={
                    <Rate
                      disabled
                      value={parseFloat(review.rating.toString())}
                      allowHalf
                      style={{ fontSize: '16px' }}
                    />
                  }
                />
                <Typography.Paragraph
                  disabled={editing}
                  editable={{
                    onChange: (text) => handleReviewChange(text, index)
                  }}
                >
                  {review.content}
                </Typography.Paragraph>
              </List.Item>
            )}
          />
          {isOverflow && (
            <Space align="center" style={{ margin: '0 auto' }}>
              <Typography.Link onClick={() => setIsSpread(!isSpread)}>
                {isSpread
                  ? '리뷰 접기'
                  : `${reviews.length - 5}개 리뷰 모두 보기`}
              </Typography.Link>
            </Space>
          )}
        </>
      ) : (
        <SecondaryText>등록된 리뷰가 없습니다.</SecondaryText>
      )}
      <ReviewsInput />
    </Section>
  )
}

export default Reviews
