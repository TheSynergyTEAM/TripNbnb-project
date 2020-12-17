import { RouteComponentProps } from 'react-router-dom'
import { Layout } from 'antd'

const Main: React.FC<RouteComponentProps> = () => {
  return (
    <Layout>
      <Layout.Content style={{ padding: '1rem', height: '100%' }}>
        Content
      </Layout.Content>
    </Layout>
  )
}

export default Main
