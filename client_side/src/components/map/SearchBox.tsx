import { Input } from 'antd'
import styled from 'styled-components'

const { Search } = Input

const StyledBox = styled.div`
  top: 2rem;
  left: 2rem;
  position: fixed;
  max-width: 300px;
  min-width: 300px;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 10;
  padding: 1rem 0.5rem;
`

const SearchBox: React.FC = () => {
  const onSearch = (value: string) => console.log(value)

  return (
    <StyledBox>
      <Search
        placeholder="여행지, 관광 명소"
        onSearch={onSearch}
        style={{ width: '100%' }}
      />
    </StyledBox>
  )
}

export default SearchBox
