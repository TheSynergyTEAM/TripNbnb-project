import { Moment } from 'moment'
import styled from 'styled-components'
import { useContext } from 'react'
import MarkerContext from 'context/Marker'
import { PrimaryText, Title } from 'components/common/typography'
import { Statistic } from 'antd'

interface PriceInformation {
  stay: number
  pay: number
}

interface PriceTextProps extends PriceInformation {
  distance?: Moment[]
}

const StyledPriceText = styled.div`
  margin-top: 1rem;
`

const PriceText: React.FC<PriceTextProps> = ({ stay, pay, distance }) => {
  const { detailItem } = useContext(MarkerContext)

  return (
    <StyledPriceText>
      <Title level={3}>
        <PrimaryText>{detailItem?.place_name}</PrimaryText>
        에서 {stay}박 {stay + 1}일 &#8361;
        <Statistic
          value={pay}
          style={{ display: 'inline-block', fontWeight: 'bolder' }}
        />
        에 예약하기
        {distance && (
          <PrimaryText>
            ({distance[0].format('YYYY-MM-DD')}) ~ (
            {distance[1].format('YYYY-MM-DD')})
          </PrimaryText>
        )}
      </Title>
    </StyledPriceText>
  )
}

export type { PriceInformation }
export default PriceText
