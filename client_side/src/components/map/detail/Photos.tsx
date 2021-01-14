import { Col, Image, Modal, Row, Typography } from 'antd'
import { SecondaryText, Title } from 'components/common/typography'
import React, { useState } from 'react'
import styled from 'styled-components'
import Section from './common/Section'

interface PhotosComponentProps {
  images: any[]
}

interface PhotoRowProps extends PhotosComponentProps {
  openModal: any
}

const StyledModal = styled(Modal)`
  top: 20px;
`

const StyledDetailImage = styled.img`
  max-width: 100%;
  margin: 0 auto 2.5rem auto;
  display: block;
  border-radius: 10px;
`

const DetailPhotos: React.FC<{ images: Array<string> }> = ({ images }) => {
  return (
    <>
      {images.map((image) => (
        <StyledDetailImage src={image} />
      ))}
    </>
  )
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
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
    </Col>
  )
}

const PhotoRow: React.FC<PhotoRowProps> = ({ images, openModal }) => {
  const photos = images.slice(0, 9)
  const isOverflow = images.length > 9

  return (
    <Row wrap gutter={6} justify="start">
      {photos.map((image) => (
        <PhotoCol image={image} key={image} />
      ))}
      {isOverflow && (
        <Typography.Link style={{ marginTop: '5px' }} onClick={openModal}>
          {images.length}개 사진 모두 보기
        </Typography.Link>
      )}
    </Row>
  )
}

const Photos: React.FC<PhotosComponentProps> = ({ images }) => {
  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return images.length ? (
    <Section
      title={<Title level={5}>사진</Title>}
      extra={
        images.length && (
          <>
            <Typography.Link onClick={openModal}>모두 보기</Typography.Link>
            <StyledModal
              title="사진 자세히 보기"
              visible={modal}
              onCancel={closeModal}
              footer={null}
              width={600}
            >
              <DetailPhotos images={images} />
            </StyledModal>
          </>
        )
      }
    >
      {images.length ? (
        <PhotoRow images={images} openModal={openModal} />
      ) : (
        <SecondaryText>등록된 사진이 없습니다.</SecondaryText>
      )}
    </Section>
  ) : null
}

export default Photos
