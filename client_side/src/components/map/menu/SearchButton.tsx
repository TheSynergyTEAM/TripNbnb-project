import { Button } from 'antd'
import MapContext from 'context/Map'
import MarkerContext from 'context/Marker'
import { useContext } from 'react'
import styled from 'styled-components'
import { categorySearch } from '../search/Function'

const StyledSearchButton = styled(Button)`
  position: fixed;
  left: 2rem;
  bottom: 3rem;
  z-index: 15;
`

const SearchButton: React.FC = () => {
  const { map, places } = useContext(MapContext)
  const markerContext = useContext(MarkerContext)

  const onReSearch = () => {
    markerContext.displayMarkers.forEach((place) => place.marker.setMap(null))
    markerContext.setDisplayMarkers([])
    categorySearch(null, markerContext, places, map)
  }

  return (
    <StyledSearchButton
      shape="round"
      className="shadow-box"
      onClick={onReSearch}
    >
      이 구역 재검색
    </StyledSearchButton>
  )
}

export default SearchButton
