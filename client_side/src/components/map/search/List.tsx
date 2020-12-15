import { List as AntdList, Typography } from 'antd'
import { purple } from '@ant-design/colors'
import styled from 'styled-components'

interface ListComponentProps {
  keyword: string
  title: string
  items: daum.maps.services.PlacesSearchResult
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

const List: React.FC<ListComponentProps> = ({ keyword, title, items }) => {
  return (
    <AntdList
      itemLayout="vertical"
      style={{ padding: '0 1rem', margin: '0' }}
      header={<ListHeader keyword={keyword} title={title} />}
      dataSource={items}
      renderItem={(item) => (
        <AntdList.Item key={item.id}>
          <AntdList.Item.Meta
            title={item.place_name}
            description={item.address_name}
          />
          <Typography.Text>Todo Rating, etc...</Typography.Text>
        </AntdList.Item>
      )}
    ></AntdList>
  )
}

export default List
