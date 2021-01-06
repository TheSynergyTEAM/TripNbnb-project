import {
  Space,
  Modal,
  DatePicker,
  ConfigProvider,
  notification,
  InputNumber
} from 'antd'
import locale from 'antd/lib/locale/ko_KR'
import { SecondaryText, Title } from 'components/common/typography'
import MarkerContext from 'context/Marker'
import { useCallback, useContext, useState } from 'react'
import styled from 'styled-components'
import '../style/picker_panel.css'
import moment, { Moment } from 'moment'
import PriceText, { PriceInformation } from './Price'
import Footer from './Footer'

interface ReservationModalProps {
  active: boolean
  handle: Function
}

const StyledModal = styled(Modal)`
  //
`

const ModalTitle = (props: any) => {
  return <Title level={4}>{props.name}에 예약하기</Title>
}

const ReservationModal: React.FC<ReservationModalProps> = (props) => {
  const { active, handle } = props
  const { detailItem } = useContext(MarkerContext)
  const [price, setPrice] = useState<PriceInformation | null>(null)
  const [value, setValue] = useState<[Moment, Moment] | undefined>(undefined)
  const [peopleCount, setPeopleCount] = useState<number>(2)

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

  const settledDates = useCallback(() => {
    if (!value || !value?.length) {
      return false
    } else {
      return !(value.length < 2)
    }
  }, [value])

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
        {settledDates && (
          <div>
            <InputNumber />
          </div>
        )}
        {price && (
          <PriceText stay={price.stay} pay={price.pay} distance={value} />
        )}
      </Space>
    </StyledModal>
  )
}

export default ReservationModal
