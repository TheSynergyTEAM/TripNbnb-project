import { List as AntdList, Typography } from 'antd'

interface ListComponentProps {
  title: string
  items: daum.maps.services.PlacesSearchResult
}

const ListHeader: React.FC<{ title: string }> = ({ title }) => {
  return <div>{title}</div>
}

const List: React.FC<ListComponentProps> = ({ title, items }) => {
  return (
    <AntdList
      style={{ padding: '0 1rem', margin: '0' }}
      header={<ListHeader title={title} />}
      dataSource={items}
      renderItem={(item) => (
        <AntdList.Item key={item.id}>
          <Typography.Text>{item.place_name}</Typography.Text>
        </AntdList.Item>
      )}
    ></AntdList>
  )
}

export default List
