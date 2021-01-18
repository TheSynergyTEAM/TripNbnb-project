import { PrimaryText, SecondaryText, Title } from 'components/common/typography'
import MarkerContext from 'context/Marker'
import { useContext } from 'react'
import styled from 'styled-components'
import LikesPlace from './LikesPlace'

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

  return (
    <Container>
      <IntroWrapper>
        <PrimaryText>{detailItem?.category_group_name}</PrimaryText>
        <Title style={{ marginTop: 0 }}>{detailItem?.place_name}</Title>
        <SecondaryText>{detailItem?.address_name}</SecondaryText>
      </IntroWrapper>
      <IntroRightWrapper>
        <LikesPlace />
      </IntroRightWrapper>
    </Container>
  )
}

export default Intro
