import { Button } from 'antd'
import { PrimaryText, SecondaryText, Title } from 'components/common/typography'
import MarkerContext from 'context/Marker'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

const IntroWrapper = styled.div`
  flex: 0 0 90%;
`

const IntroRightWrapper = styled.div`
  flex: 0 0 10%;
`

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 0 1rem;
  margin: 0.5rem 0;
`

const Intro: React.FC = () => {
  const { detailItem } = useContext(MarkerContext)
  const [heart, setHeart] = useState(false)

  return (
    <Container>
      <IntroWrapper>
        <PrimaryText>{detailItem?.category_group_name}</PrimaryText>
        <Title style={{ marginTop: 0 }}>{detailItem?.place_name}</Title>
        <SecondaryText>{detailItem?.address_name}</SecondaryText>
      </IntroWrapper>
      <IntroRightWrapper>
        <Button
          shape="circle"
          type={heart ? 'primary' : 'default'}
          icon={
            heart ? (
              <HeartFilled style={{ color: 'white' }} />
            ) : (
              <HeartOutlined />
            )
          }
          onClick={(e) => setHeart(!heart)}
        />
      </IntroRightWrapper>
    </Container>
  )
}

export default Intro
