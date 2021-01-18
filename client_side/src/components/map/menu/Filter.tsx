import { Checkbox } from 'antd'
import MapContext from 'context/Map'
import MarkerContext from 'context/Marker'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledFilterBox = styled.div`
  background-color: white;
  border-radius: 7px;
  bottom: 6rem;
  height: auto;
  left: 2rem;
  overflow: hidden;
  padding: 0.7rem 1rem;
  position: fixed;
  width: 150px;
  z-index: 15;

  & .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
`

const CheckBox: React.FC<any> = ({ title, type }) => {
  const { displayMarkers } = useContext(MarkerContext)
  const { map } = useContext(MapContext)
  const [value, setValue] = useState(true)

  useEffect(() => {
    onToggle(value)
    // eslint-disable-next-line
  }, [displayMarkers])

  const onToggle = (checked: boolean) => {
    setValue(checked)

    let code = ''

    switch (type) {
      case 'attraction':
        code = 'AT4'
        break
      case 'hotel':
        code = 'AD5'
        break
      case 'restaurant':
        code = 'FD6'
        break
      default:
        break
    }

    const serachMarkers = displayMarkers.filter(
      (place) => place.item.category_group_code === code
    )

    if (!serachMarkers.length || !map) return

    serachMarkers.forEach((place) => {
      if (checked) {
        place.marker.setMap(map)
      } else {
        place.marker.setMap(null)
      }
    })
  }

  return (
    <Checkbox
      defaultChecked
      checked={value}
      onChange={(e) => onToggle(e.target.checked)}
    >
      {title}
    </Checkbox>
  )
}

const checkBoxes = [
  {
    title: '관광 명소',
    type: 'attraction'
  },
  {
    title: '숙박 시설',
    type: 'hotel'
  },
  {
    title: '음식점',
    type: 'restaurant'
  }
]

const Filter: React.FC = () => {
  return (
    <StyledFilterBox className="shadow-box">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {checkBoxes.map((place) => (
          <CheckBox title={place.title} type={place.type} key={place.type} />
        ))}
      </div>
    </StyledFilterBox>
  )
}

export default Filter
