import { List as AntdList, Typography } from 'antd'
import { purple } from '@ant-design/colors'
import styled from 'styled-components'
import { useContext } from 'react'
import MapContext from 'context/Map'
import { MouseOver, MouseOut, Register, MouseClick } from 'event/Marker'
import Marker from 'context/Marker'

interface ListComponentProps {
  keyword: string
  title: string
  items: daum.maps.services.PlacesSearchResult
  onMove: Function
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

const List: React.FC<ListComponentProps> = ({
  keyword,
  title,
  items,
  onMove
}) => {
  const { map, places } = useContext(MapContext)
  // @ts-ignore
  const MarkerContext = useContext(Marker)

  const moveToTarget = (item: ResultItem) => {
    map?.setCenter(new daum.maps.LatLng(parseFloat(item.y), parseFloat(item.x)))
    places?.categorySearch(
      // @ts-ignore
      'AT4',
      (result, status, pagenation) => {
        if (status === daum.maps.services.Status.OK) {
          if (pagenation.hasNextPage) {
            // 모든 검색 결과에 대해서 마커 찍기
            pagenation.nextPage()
          }
          if (result.length) {
            result.forEach((item) => {
              // 마커 생성
              const marker = new daum.maps.Marker({
                position: new daum.maps.LatLng(
                  parseFloat(item.y),
                  parseFloat(item.x)
                )
              })
              // 이벤트 등록 (MouseOver)
              Register(
                marker,
                'mouseover',
                MouseOver(marker, MarkerContext, item)
              )
              // 이벤트 등록 (MouseOut)
              Register(marker, 'mouseout', MouseOut(MarkerContext))
              // 이벤트 등록 (MouseClick)
              Register(marker, 'click', MouseClick(MarkerContext, item))
              // 맵에 마커를 찍음
              marker.setMap(map as daum.maps.Map)
            })
          }
        }
      },
      { x: parseFloat(item.x), y: parseFloat(item.y) }
    )

    onMove()
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
          onClick={(e) => moveToTarget(item)}
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
