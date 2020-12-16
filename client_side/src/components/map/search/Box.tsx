import { Input } from 'antd'
import MapContext from 'context/Map'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import List from './List'

const { Search } = Input

const StyledBox = styled.div`
  max-height: 70%;
  overflow-y: auto;
  top: 2rem;
  left: 2rem;
  position: fixed;
  max-width: 300px;
  min-width: 300px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 10;
  transition: all 0.5s ease;
`

const StyledSearch = styled(Search)`
  background-color: white;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 15;
`

const ResultWrapper = styled.div`
  /* margin-top: 0.5rem; */
`

const SearchBox: React.FC = () => {
  const [searchResult, setSearchResult] = useState<
    Array<daum.maps.services.PlacesSearchResultItem>
  >([])
  const [allSearchResult, setAllSearchResult] = useState<
    Array<daum.maps.services.PlacesSearchResultItem>
  >([])
  const [isSearch, setIsSearch] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { places } = useContext(MapContext)
  const handleSearch = (value: string) => {
    const cb = (
      result: Array<daum.maps.services.PlacesSearchResultItem>,
      status: any
    ): void => {
      if (status === daum.maps.services.Status.OK) {
        setIsSearch(true)
        setSearchResult([])
        setAllSearchResult([])
        setKeyword(value)
        if (result.length) {
          // 여행지, 관광 명소
          const attraction = result.filter(
            (item) => item.category_group_code === 'AT4'
          )
          const noAttraction = result.filter(
            (item) => item.category_group_code !== 'AT4'
          )

          setSearchResult(attraction)
          setAllSearchResult(noAttraction)
        }
      }
    }

    ;(places as daum.maps.services.Places).keywordSearch(value, cb)
  }

  useEffect(() => {
    return () => {
      setSearchResult([])
      setAllSearchResult([])
      setIsSearch(false)
    }
  }, [])

  return (
    <StyledBox className="shadow-box">
      <StyledSearch
        placeholder="여행지, 관광 명소"
        onSearch={handleSearch}
        style={{ width: '100%' }}
      />
      {isSearch && (
        <ResultWrapper>
          <List
            keyword={keyword}
            items={searchResult}
            title="여행지, 관광명소 검색 결과"
          />
          <List
            keyword={keyword}
            items={allSearchResult}
            title="기타 장소 검색 결과"
          />
        </ResultWrapper>
      )}
    </StyledBox>
  )
}

export default SearchBox
