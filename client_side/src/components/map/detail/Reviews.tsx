import React, { useCallback, useEffect, useState } from 'react'
// import MarkerContext from 'context/Marker'
import Section from './common/Section'
import { SecondaryText, Title } from 'components/common/typography'
import { List, Rate, Space, Typography } from 'antd'
import { purple, grey } from '@ant-design/colors'
import Avatar from 'antd/lib/avatar/avatar'
import styled from 'styled-components'
import { dayjs } from 'api'

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

const StyledTabWrapper = styled.ul`
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  text-align: right;
`

const StyledTabItem = styled.li`
  cursor: pointer;
  display: inline-block;

  &.active {
    color: ${purple.primary};
  }

  &:not(:last-child)::after {
    content: '|';
    display: inline-block;
    margin: 0 3px;
    font-size: 13px;
    vertical-align: top;
    color: ${grey[0]};
  }
`

const TabItems = [
  {
    name: '최신순',
    value: 0
  },
  {
    name: '평점높은순',
    value: 1
  },
  {
    name: '평점낮은순',
    value: 2
  }
]

const Tabs: React.FC<any> = ({ active, onChange }) => {
  return (
    <StyledTabWrapper>
      {TabItems.map((item, idx, _) => (
        <StyledTabItem
          key={idx}
          className={idx === active ? 'active' : ''}
          style={{ cursor: 'pointer' }}
          onClick={() => onChange(item.value)}
        >
          {item.name}
        </StyledTabItem>
      ))}
    </StyledTabWrapper>
  )
}

const Reviews: React.FC<ReviewsComponentProps> = ({ reviews }) => {
  // const { detailItem } = useContext(MarkerContext)
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
          <Tabs active={tabActive} onChange={handleTabChange} />
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
        </>
      ) : (
        <SecondaryText>등록된 리뷰가 없습니다.</SecondaryText>
      )}
    </Section>
  )
}

export default Reviews
