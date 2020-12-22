import { PrimaryText, SecondaryText, Title } from 'components/common/typography'
import MarkerContext from 'context/Marker'
import { useContext } from 'react'
import styled from 'styled-components'

const IntroWrapper = styled.div`
  padding: 0 1rem;
  margin-bottom: 0.5rem;
`

const Intro: React.FC = () => {
  const { detailItem } = useContext(MarkerContext)

  return (
    <IntroWrapper>
      <PrimaryText>{detailItem?.category_group_name}</PrimaryText>
      <Title style={{ marginTop: 0 }}>{detailItem?.place_name}</Title>
      <SecondaryText>{detailItem?.address_name}</SecondaryText>
    </IntroWrapper>
  )
}

export default Intro
