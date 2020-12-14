import { Input } from 'antd'
import MapContext from 'context/MapContext'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

interface KeywordSearchResult {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: number | string
  y: number | string
}

const { Search } = Input

const StyledBox = styled.div`
  top: 2rem;
  left: 2rem;
  position: fixed;
  max-width: 300px;
  min-width: 300px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 10;
  padding: 1rem;
`

const SearchBox: React.FC = () => {
  const [searchResult, setSearchResult] = useState<Array<KeywordSearchResult>>(
    []
  )
  const [isSearch, setIsSearch] = useState(false)
  const { places } = useContext(MapContext)
  const handleSearch = (value: string) => {
    const cb = (result: Array<KeywordSearchResult>, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setIsSearch(true)
        if (result.length) {
          // 여행지, 관광 명소
          const attraction = result.filter(
            (item) => item.category_group_code === 'AT4'
          )

          if (!attraction.length) {
            setSearchResult([])
          } else {
            setSearchResult(attraction)
          }
        }
      }
    }

    places.keywordSearch(value, cb)
  }

  useEffect(() => {
    return () => {
      setSearchResult([])
      setIsSearch(false)
    }
  }, [])

  return (
    <StyledBox className="shadow-box">
      <Search
        placeholder="여행지, 관광 명소"
        onSearch={handleSearch}
        style={{ width: '100%' }}
      />
      {isSearch && (
        <div>
          {searchResult.length ? (
            <div className="result"></div>
          ) : (
            <div className="no-result"></div>
          )}
        </div>
      )}
    </StyledBox>
  )
}

export default SearchBox
