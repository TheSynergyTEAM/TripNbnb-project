import { Space, Modal, DatePicker, ConfigProvider, notification } from 'antd'
import locale from 'antd/lib/locale/ko_KR'
import { SecondaryText, Title } from 'components/common/typography'
import MarkerContext from 'context/Marker'
import { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import '../style/picker_panel.css'
import moment, { Moment } from 'moment'
import PriceText, { PriceInformation } from './Price'
import Footer from './Footer'
import Information from './Information'

interface ReservationModalProps {
  active: boolean
  handle: Function
}

interface Room {
  name: string
  price: number
  limit: number
}

const StyledModal = styled(Modal)`
  //
`

const ModalTitle = (props: any) => {
  return <Title level={4}>{props.name}에 예약하기</Title>
}

const defaultSelectOptions: Array<Room> = [
  {
    name: '싱글룸',
    price: 30000,
    limit: 1
  },
  {
    name: '더블룸',
    price: 40000,
    limit: 2
  },
  {
    name: '트윈룸',
    price: 50000,
    limit: 2
  },
  {
    name: '트리플룸',
    price: 60000,
    limit: 3
  },
  {
    name: '스위트룸',
    price: 70000,
    limit: 6
  }
]

const ReservationModal: React.FC<ReservationModalProps> = (props) => {
  const { active, handle } = props
  const { detailItem } = useContext(MarkerContext)
  const [price, setPrice] = useState<PriceInformation | null>(null)
  const [value, setValue] = useState<[Moment, Moment] | undefined>(undefined)
  const [peopleCount, setPeopleCount] = useState<number>(2)
  // eslint-disable-next-line
  const [selectOptions, setSelectOptions] = useState(defaultSelectOptions)
  const [selectValue, setSelectValue] = useState(selectOptions[0])

  useEffect(() => {
    if (!value || !value?.length) {
      setPrice(null)
    } else {
      const distanceDay = moment.duration(value[1].diff(value[0])).asDays()
      const room = defaultSelectOptions.find(
        (option) => option.name === selectValue.name
      ) as Room

      let pay = 0

      if (room) {
        const payPerPeople =
          peopleCount > room.limit ? (peopleCount - room.limit) * room.price : 0
        pay = room.price * distanceDay + payPerPeople
      }

      setPrice({
        stay: distanceDay,
        pay
      })
    }
  }, [value, peopleCount, selectValue])

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
      footer={
        <Footer
          disabled={!settledDates}
          date={{ checkIn: value?.[0], checkOut: value?.[1] }}
          peopleCount={peopleCount}
          room={selectValue}
          onReservation={handleClose}
        />
      }
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
        {settledDates() && (
          <Information
            peopleCount={peopleCount}
            onChangePeopleCount={setPeopleCount}
            selectOptions={selectOptions}
            setSelectValue={setSelectValue}
          />
        )}
        {price && (
          <PriceText
            stay={price.stay}
            pay={price.pay}
            distance={value}
            roomOption={selectValue || ''}
            peopleCount={peopleCount}
          />
        )}
      </Space>
    </StyledModal>
  )
}

export type { Room }

export default ReservationModal
