import { Checkbox } from 'antd'
import { PrimaryText } from 'components/common/typography'
import styled from 'styled-components'

const StyledFilterBox = styled.div`
  background-color: white;
  border-radius: 7px;
  bottom: 6rem;
  height: auto;
  left: 2rem;
  overflow: hidden;
  padding: 0.5rem 1rem;
  position: fixed;
  width: 200px;
  z-index: 15;

  & .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
`

const Filter: React.FC = () => {
  return (
    <StyledFilterBox className="shadow-box">
      <PrimaryText style={{ fontWeight: 'bold' }}>필터 박스 미구현</PrimaryText>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '0.5rem'
        }}
      >
        <Checkbox>관광 명소</Checkbox>
        <Checkbox>숙박 시설</Checkbox>
        <Checkbox>음식점</Checkbox>
      </div>
    </StyledFilterBox>
  )
}

export default Filter
