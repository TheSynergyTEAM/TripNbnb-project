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
import { checkReservation } from 'components/map/hooks/reservation-hooks'

interface ReservationModalProps {
  active: boolean
  handle: Function
}

interface Room {
  name: string
  price: number
  limit: number
  type: string
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
    limit: 1,
    type: 'ROOM_SINGLE'
  },
  {
    name: '더블룸',
    price: 40000,
    limit: 2,
    type: 'ROOM_DOUBLE'
  },
  {
    name: '트윈룸',
    price: 50000,
    limit: 2,
    type: 'ROOM_TWIN'
  },
  {
    name: '트리플룸',
    price: 60000,
    limit: 3,
    type: 'ROOM_TRIPLE'
  },
  {
    name: '스위트룸',
    price: 70000,
    limit: 6,
    type: 'ROOM_SUITE'
  }
]

const ReservationModal: React.FC<ReservationModalProps> = (props) => {
  const { active, handle } = props
  const { detailItem } = useContext(MarkerContext)
  const [price, setPrice] = useState<PriceInformation | null>(null)
  const [value, setValue] = useState<[Moment, Moment] | undefined>(undefined)
  const [peopleCount, setPeopleCount] = useState<number>(2)
  const selectOptions = defaultSelectOptions
  const [selectValue, setSelectValue] = useState<Room | null>(null)

  // check
  const [checkLoading, setCheckLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (!value || !value?.length || !selectValue) {
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

  const handleChecking = () => {
    if (checkLoading) {
      return
    }

    setCheckLoading(true)

    if (detailItem && value && value[0] && value[1]) {
      const room = selectValue || selectOptions[0]

      checkReservation(
        detailItem,
        // @ts-ignore
        room.type,
        value[0].format('YYYY-MM-DD'),
        value[1].format('YYYY-MM-DD')
      )
        .then((result) => {
          setDisabled(false)
        })
        .catch((error) => {
          console.log(error)
          setDisabled(true)
        })
    } else {
      setDisabled(true)
    }

    setCheckLoading(false)
  }

  const settledDates = useCallback(() => {
    if (!value || !value?.length) {
      return false
    } else {
      return !(value.length < 2)
    }
  }, [value])

  const checked = useCallback(() => {
    return !settledDates() || disabled
  }, [disabled, settledDates])

  const handleClose = () => {
    setPrice(null)
    setValue(undefined)
    setCheckLoading(false)
    setDisabled(true)
    setPeopleCount(2)
    setSelectValue(null)
    handle(false)
  }

  return (
    <StyledModal
      visible={active}
      onCancel={handleClose}
      title={<ModalTitle name={detailItem?.place_name} />}
      footer={
        <Footer
          disabled={checked()}
          date={{ checkIn: value?.[0], checkOut: value?.[1] }}
          peopleCount={peopleCount}
          room={selectValue}
          onReservation={handleClose}
          price={price as PriceInformation}
          checkLoading={checkLoading}
        />
      }
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <SecondaryText>원하는 날짜 선택하기</SecondaryText>
        <ConfigProvider locale={locale}>
          <DatePicker.RangePicker
            disabled={checkLoading}
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
            disabled={checkLoading}
            peopleCount={peopleCount}
            onChangePeopleCount={setPeopleCount}
            selectOptions={selectOptions}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            checking={handleChecking}
          />
        )}
        {price && selectValue && (
          <PriceText
            disabled={checked()}
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
