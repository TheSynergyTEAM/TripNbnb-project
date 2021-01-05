import { Col, Image, Row, Typography } from 'antd'
import { SecondaryText, Title } from 'components/common/typography'
import React from 'react'
import Section from './common/Section'

interface PhotosComponentProps {
  images: any[]
}

const PhotoCol: React.FC<any> = ({ image }) => {
  return (
    <Col span="8" style={{ marginBottom: '3px' }}>
      <Image
        src={image}
        preview={false}
        width="100%"
        height={100}
        style={{ borderRadius: '5px' }}
      />
    </Col>
  )
}

const PhotoRow: React.FC<PhotosComponentProps> = ({ images }) => {
  const photos = images.slice(0, 9)
  const isOverflow = images.length > 9

  return (
    <Row wrap gutter={6} justify="start">
      {photos.map((image) => (
        <PhotoCol image={image} key={image} />
      ))}
      {isOverflow && (
        <Typography.Link style={{ marginTop: '5px' }}>
          {images.length}개 사진 모두 보기
        </Typography.Link>
      )}
    </Row>
  )
}

const Photos: React.FC<PhotosComponentProps> = ({ images }) => {
  return images.length ? (
    <Section
      title={<Title level={5}>사진</Title>}
      extra={images.length && <a href="##">모두 보기</a>}
    >
      {images.length ? (
        <PhotoRow images={images} />
      ) : (
        <SecondaryText>등록된 사진이 없습니다.</SecondaryText>
      )}
    </Section>
  ) : null
}

export default Photos
