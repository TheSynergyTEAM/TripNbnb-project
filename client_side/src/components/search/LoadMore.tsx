import { useContext } from 'react'
import SearchContext from 'context/Search'
import { Button } from 'antd'
import DownOutlined from '@ant-design/icons/DownOutlined'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 1rem 2rem;
`

const LoadMore: React.FC = () => {
  const { pagination } = useContext(SearchContext)

  const handleLoadMore = () => {
    if (!pagination) {
      return
    }

    pagination.nextPage()
  }

  return pagination && pagination.hasNextPage ? (
    <Container>
      <Button
        type="text"
        icon={<DownOutlined />}
        style={{ width: '100%' }}
        onClick={handleLoadMore}
      />
    </Container>
  ) : null
}

export default LoadMore
