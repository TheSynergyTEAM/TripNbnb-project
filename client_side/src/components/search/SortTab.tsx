import { Col, Row } from 'antd'
import { Column } from 'components/search/Bar'
import SearchContext from 'context/Search'
import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { purple } from '@ant-design/colors'

type FilterItem = {
  action: string
  active: boolean
  name: string
}

const StyledTab = styled.li`
  display: inline-block;
  padding: 0 1rem 0.5rem 1rem;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.className?.includes('active') ? `3px solid ${purple[3]}` : 'none'};
  font-weight: ${(props) =>
    props.className?.includes('active') ? 'bold' : 'normal'};
`

const TabContainer = styled.ul`
  display: block;
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
`

const filtering: FilterItem[] = [
  {
    action: 'ALL',
    active: true,
    name: '전체'
  },
  {
    action: 'AT4',
    active: false,
    name: '관광명소'
  },
  {
    action: 'AD5',
    active: false,
    name: '숙박'
  },
  {
    action: 'FD6',
    active: false,
    name: '음식점'
  }
]

const SortTab: React.FC = () => {
  const { resultItem, setSortedResultItem } = useContext(SearchContext)
  const [filter, setFilter] = useState<FilterItem[]>(filtering)
  const [currentFilter, setCurrentFilter] = useState<FilterItem>(filter[0])

  const handleTabChange = (e: React.SyntheticEvent, item: FilterItem) => {
    if (item.active) return

    const noActives = filter.map(d => {
      d.active = false
      return d
    })

    const target = filter.find(d => d === item) as FilterItem
    target.active = true

    setCurrentFilter(target)
    setFilter(noActives)
  }

  useEffect(() => {
    if (!resultItem.length) {
      return
    }

    if (currentFilter.action === 'ALL') {
      setSortedResultItem(resultItem)
    } else {
      const filter = resultItem.filter(item => item.category_group_code === currentFilter.action)
      setSortedResultItem(filter)
    }
    // eslint-disable-next-line
  }, [currentFilter])

  return (
    <Row justify="center">
      <Col {...Column}>
        <TabContainer>
          {filter.map((item) => (
            <StyledTab
              key={item.action}
              className={item.active ? 'active' : ''}
              onClick={e => handleTabChange(e, item)}
            >
              {item.name}
            </StyledTab>
          ))}
        </TabContainer>
      </Col>
    </Row>
  )
}

export default SortTab
