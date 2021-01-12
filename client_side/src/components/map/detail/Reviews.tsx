import React, { useCallback, useContext, useEffect, useState } from 'react'
import Section from './common/Section'
import { SecondaryText, Title } from 'components/common/typography'
import { Divider, List, Rate, Space, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import styled from 'styled-components'
import dayjs from 'api/date'
import ReviewsTabs from './ReviewsTab'
import ReviewsInput from './ReviewsInput'
import { ReviewData } from 'components/map/hooks/FetchPlace'
import UserContext from 'context/User'

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

const ReviewAction: React.FC<{ review: ReviewData }> = ({ review }) => {
  const isOwner = useReviewOwner(review)

  return isOwner ? (
    <>
      <Typography.Link>삭제</Typography.Link>
      <Divider type="vertical" />
      <Typography.Link>수정</Typography.Link>
    </>
  ) : null
}

const Reviews: React.FC<ReviewsComponentProps> = ({ reviews }) => {
  const [isSpread, setIsSpread] = useState(false)
  const [tabActive, setTabActive] = useState(0)
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
  const isOverflow = reviews.length > 5
  const handleTabChange = (value: number) => {
    if (tabActive === value) {
      return
    }
    setTabActive(value)
  }

  useEffect(() => {
    return () => {
      setIsSpread(false)
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
            renderItem={(review) => (
              <List.Item actions={[<ReviewAction review={review} />]}>
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
                {review.content}
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
