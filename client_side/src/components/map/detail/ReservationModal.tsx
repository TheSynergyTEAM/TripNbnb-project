import {
  Space,
  Modal,
  DatePicker,
  ConfigProvider,
  notification,
  Statistic
} from 'antd'
import locale from 'antd/lib/locale/ko_KR'
import { PrimaryText, SecondaryText, Title } from 'components/common/typography'
import MarkerContext from 'context/Marker'
// import UserContext from 'context/User'
import { useContext, useState } from 'react'
import styled from 'styled-components'
import './style/picker_panel.css'
import moment, { Moment } from 'moment'
import { RButton } from './Reservation'

interface ReservationModalProps {
  active: boolean
  handle: Function
}

interface PriceInformation {
  stay: number
  pay: number
}

interface PriceTextProps extends PriceInformation {
  distance?: Moment[]
}

const StyledModal = styled(Modal)`
  //
`

const StyledPriceText = styled.div`
  margin-top: 1rem;
`

const ModalTitle = (props: any) => {
  return <Title level={4}>{props.name}에 예약하기</Title>
}

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

const Footer: React.FC<any> = ({ disabled }) => {
  return (
    <>
      <RButton disabled={disabled}>예약하기</RButton>
    </>
  )
}

const ReservationModal: React.FC<ReservationModalProps> = (props) => {
  const { active, handle } = props
  const { detailItem } = useContext(MarkerContext)
  // const { user } = useContext(UserContext)
  const [price, setPrice] = useState<PriceInformation | null>(null)
  const [value, setValue] = useState<[Moment, Moment] | undefined>(undefined)

  const disabledDate = (current: Moment) => {
    return current && current < moment().startOf('day')
  }

  const handleChange = (moments: any, _dateStrings: string[]) => {
    if (!moments || !moments.length) {
      setPrice(null)
      setValue(undefined)
    } else {
      const isSameDay = moment(_dateStrings[0]).isSame(_dateStrings[1])

      if (isSameDay) {
        setPrice(null)
        setValue(undefined)
        return notification.error({
          message: '같은 날로 설정할 수 없습니다.',
          placement: 'topLeft'
        })
      } else {
        const distanceDay = moment
          .duration(moments[1].diff(moments[0]))
          .asDays()

        setPrice({
          stay: distanceDay,
          pay: distanceDay * 40000
        })
        setValue(moments)
      }
    }
  }

  const handleClose = () => {
    setPrice(null)
    setValue(undefined)
    handle(false)
  }

  return (
    <StyledModal
      visible={active}
      onCancel={handleClose}
      title={<ModalTitle name={detailItem?.place_name} />}
      footer={<Footer disabled={!price} />}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <SecondaryText>원하는 날짜 선택하기</SecondaryText>
        <ConfigProvider locale={locale}>
          <DatePicker.RangePicker
            separator="~"
            size="large"
            style={{ width: '100%' }}
            disabledDate={disabledDate}
            value={value || null}
            onChange={(moments, dateStrings) =>
              handleChange(moments, dateStrings)
            }
          />
        </ConfigProvider>
        {price && (
          <PriceText stay={price.stay} pay={price.pay} distance={value} />
        )}
      </Space>
    </StyledModal>
  )
}

export default ReservationModal
