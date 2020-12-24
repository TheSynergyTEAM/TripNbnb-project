import React, { useCallback, useContext, useEffect, useState } from 'react'
import MarkerContext from 'context/Marker'
import Section from './common/Section'
import { SecondaryText, Title } from 'components/common/typography'
import { List, Rate, Space, Typography } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import styled from 'styled-components'

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
  const { detailItem } = useContext(MarkerContext)
  const [isSpread, setIsSpread] = useState(false)
  const slicedReviews = useCallback(() => {
    if (!isSpread) {
      return reviews.data.slice(0, 5)
    } else {
      return reviews.data
    }
  }, [isSpread, reviews.data])
  const isOverflow = reviews.data.length > 5

  useEffect(() => {
    if (reviews && detailItem) {
      console.log(reviews, detailItem)
    }
  }, [reviews, detailItem])

  return (
    <Section title={<Title level={5}>리뷰</Title>}>
      {reviews.data.length ? (
        <>
          <List
            dataSource={slicedReviews()}
            itemLayout="vertical"
            renderItem={(review) => (
              <List.Item>
                <StyledListItemMeta
                  avatar={<Avatar src={review.user.avatar} size="default" />}
                  title={review.user.name}
                  description={
                    <Rate
                      disabled
                      defaultValue={review.rating}
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
        </>
      ) : (
        <SecondaryText>등록된 리뷰가 없습니다.</SecondaryText>
      )}
    </Section>
  )
}

export default Reviews
