import React, { useCallback, useEffect, useState } from 'react'
// import MarkerContext from 'context/Marker'
import Section from './common/Section'
import { SecondaryText, Title } from 'components/common/typography'
import { List, Rate, Space, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import styled from 'styled-components'
import { dayjs } from 'api'
import ReviewsTabs from './ReviewsTab'
import ReviewsInput from './ReviewsInput'

interface ReviewsComponentProps {
  reviews: {
    data: any[]
    meta?: any
  }
}

const StyledListItemMeta = styled(List.Item.Meta)`
  & .ant-list-item-meta-title {
    margin-bottom: 0;
  }
`

const Reviews: React.FC<ReviewsComponentProps> = ({ reviews }) => {
  const [isSpread, setIsSpread] = useState(false)
  const [tabActive, setTabActive] = useState(0)
  const slicedReviews = useCallback(() => {
    switch (tabActive) {
      case 0:
        reviews.data.sort((a, b) => b.createdAt - a.createdAt)
        break
      case 1:
        reviews.data.sort((a, b) => (a.rating > b.rating ? -1 : 1))
        break
      case 2:
        reviews.data.sort((a, b) => (a.rating > b.rating ? 1 : -1))
        break
    }
    if (!isSpread) {
      return reviews.data.slice(0, 5)
    }
    return reviews.data
  }, [isSpread, reviews.data, tabActive])
  const isOverflow = reviews.data.length > 5
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
      {reviews.data.length ? (
        <>
          <ReviewsTabs active={tabActive} onChange={handleTabChange} />
          <List
            dataSource={slicedReviews()}
            itemLayout="vertical"
            renderItem={(review) => (
              <List.Item>
                <StyledListItemMeta
                  avatar={<Avatar src={review.user.avatar} size="default" />}
                  title={
                    <>
                      <span>{review.user.name}</span>
                      <SecondaryText
                        style={{ marginLeft: '0.5rem', fontSize: '14px' }}
                      >
                        {dayjs(new Date(review.createdAt)).fromNow()}
                      </SecondaryText>
                    </>
                  }
                  description={
                    <Rate
                      disabled
                      value={review.rating}
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
                  : `${reviews.data.length - 5}개 리뷰 모두 보기`}
              </Typography.Link>
            </Space>
          )}
          <ReviewsInput />
        </>
      ) : (
        <SecondaryText>등록된 리뷰가 없습니다.</SecondaryText>
      )}
    </Section>
  )
}

export default Reviews
