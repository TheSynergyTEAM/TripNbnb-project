import { purple, grey } from '@ant-design/colors'
import styled from 'styled-components'

interface TabsComponentProps {
  active: number
  onChange: Function
}

const TabItems = [
  {
    name: '최신순',
    value: 0
  },
  {
    name: '평점높은순',
    value: 1
  },
  {
    name: '평점낮은순',
    value: 2
  }
]

const StyledTabWrapper = styled.ul`
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  text-align: right;
`

const StyledTabItem = styled.li`
  cursor: pointer;
  display: inline-block;

  &.active {
    color: ${purple.primary};
  }

  &:not(:last-child)::after {
    content: '|';
    display: inline-block;
    margin: 0 3px;
    font-size: 13px;
    vertical-align: top;
    color: ${grey[0]};
  }
`

const ReviewsTabs: React.FC<TabsComponentProps> = ({ active, onChange }) => {
  return (
    <StyledTabWrapper>
      {TabItems.map((item, idx, _) => (
        <StyledTabItem
          key={idx}
          className={idx === active ? 'active' : ''}
          style={{ cursor: 'pointer' }}
          onClick={() => onChange(item.value)}
        >
          {item.name}
        </StyledTabItem>
      ))}
    </StyledTabWrapper>
  )
}

export default ReviewsTabs
