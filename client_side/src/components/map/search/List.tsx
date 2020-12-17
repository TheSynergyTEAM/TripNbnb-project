import { List as AntdList, Typography } from 'antd'
import { purple } from '@ant-design/colors'
import styled from 'styled-components'
import { useContext } from 'react'
import MapContext from 'context/Map'

interface ListComponentProps {
  keyword: string
  title: string
  items: daum.maps.services.PlacesSearchResult
}

const StyledHeader = styled.div`
  color: ${purple.primary};
`

const KeywordHighlight = styled(Typography.Text)`
  color: currentColor;
  font-size: 18px;
  margin-right: 0.4rem;
`

const ListHeader: React.FC<{ title: string; keyword: string }> = ({
  title,
  keyword
}) => {
  return (
    <StyledHeader>
      <KeywordHighlight strong>'{keyword}'</KeywordHighlight>
      {title}
    </StyledHeader>
  )
}

const List: React.FC<ListComponentProps> = ({ keyword, title, items }) => {
  const { map, places } = useContext(MapContext)

  const moveToTarget = (
    item: daum.maps.services.PlacesSearchResultItem,
    e: React.MouseEvent
  ) => {
    const lat = parseFloat(item.y)
    const lng = parseFloat(item.x)
    map?.setCenter(new daum.maps.LatLng(lat, lng))
    places?.categorySearch(
      // @ts-ignore
      'AT4',
      (result, status) => {
        if (status === daum.maps.services.Status.OK) {
          result.forEach((item) => {
            const placeLat = parseFloat(item.y)
            const placeLng = parseFloat(item.x)
            const marker = new daum.maps.Marker({
              position: new daum.maps.LatLng(placeLat, placeLng)
            })
            marker.setMap(map as daum.maps.Map)
          })
        }
      },
      { x: lng, y: lat }
    )
  }

  return (
    <AntdList
      locale={{ emptyText: '검색 결과가 없습니다.' }}
      itemLayout="vertical"
      style={{ padding: '0 1rem', margin: '0' }}
      header={<ListHeader keyword={keyword} title={title} />}
      dataSource={items}
      renderItem={(item) => (
        <AntdList.Item
          key={item.id}
          onClick={(e) => moveToTarget(item, e)}
          style={{ cursor: 'pointer' }}
        >
          <AntdList.Item.Meta
            title={item.place_name}
            description={item.address_name}
          />
          <Typography.Text>Todo Rating, etc...</Typography.Text>
        </AntdList.Item>
      )}
    ></AntdList>
  )
}

export default List
