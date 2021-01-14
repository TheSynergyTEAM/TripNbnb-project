import { Button } from 'antd'
import styled from 'styled-components'

const StyledSearchButton = styled(Button)`
  position: fixed;
  left: 2rem;
  bottom: 3rem;
  z-index: 15;
`

const SearchButton: React.FC = () => {
  return (
    <StyledSearchButton shape="round" className="shadow-box">
      이 구역 재검색
    </StyledSearchButton>
  )
}

export default SearchButton
