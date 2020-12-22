import { List as AntdList, Typography } from 'antd'
import { purple } from '@ant-design/colors'
import styled from 'styled-components'
import { useContext } from 'react'
import MapContext from 'context/Map'
import Marker from 'context/Marker'
import { categorySearch } from './Function'

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
    // 마커 초기화
    MarkerContext.displayMarkers.forEach((marker) => marker.setMap(null))
    MarkerContext.setDisplayMarkers([])

    // 카테고리 검색, 마커 찍기, 이벤트 등록
    categorySearch(item, MarkerContext, places, map)
    // 리스트 아이템 초기화
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
        </AntdList.Item>
      )}
    ></AntdList>
  )
}

export default List
