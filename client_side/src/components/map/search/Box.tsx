import { Input } from 'antd'
import MapContext from 'context/Map'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { placeSearch } from './Function'
import List from './List'

const { Search } = Input

const StyledBox = styled.div`
  max-height: 70%;
  overflow-y: auto;
  top: 5.5rem;
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
  const [searchResult, setSearchResult] = useState<Array<ResultItem>>([])
  const [allSearchResult, setAllSearchResult] = useState<Array<ResultItem>>([])
  const [isSearch, setIsSearch] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { places } = useContext(MapContext)

  const handleSearch = (value: string) => {
    placeSearch(
      places,
      value,
      'AT4',
      (
        codeResults: Array<ResultItem>,
        withoutCodeResults: Array<ResultItem>
      ) => {
        setIsSearch(true)
        setKeyword(value)
        setSearchResult(codeResults)
        setAllSearchResult(withoutCodeResults)
      }
    )
  }

  const initState = () => {
    setSearchResult([])
    setAllSearchResult([])
    setIsSearch(false)
    setKeyword('')
  }

  useEffect(() => {
    return () => {
      initState()
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
            onMove={initState}
          />
          <List
            keyword={keyword}
            items={allSearchResult}
            title="기타 장소 검색 결과"
            onMove={initState}
          />
        </ResultWrapper>
      )}
    </StyledBox>
  )
}

export default SearchBox
