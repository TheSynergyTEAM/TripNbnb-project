import { Button } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import UserContext from 'context/User'
import MarkerContext from 'context/Marker'
import { fetchPlaceLists, pushPlaceLists } from 'api/user'

const LikesPlace: React.FC = () => {
  const { user, isLoggedIn, setPlaceLists } = useContext(UserContext)
  const { detailItem } = useContext(MarkerContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [heart, setHeart] = useState<boolean>(false)

  const placeLists = async () => {
    if (!isLoggedIn || !user) {
      return
    }

    setLoading(true)

    const data = await fetchPlaceLists(user.id)

    setPlaceLists(data)

    if (
      data.find(
        (l) =>
          l.id ===
          parseInt((detailItem as daum.maps.services.PlacesSearchResultItem).id)
      )
    ) {
      setHeart(true)
    } else {
      setHeart(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    placeLists()
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    if (heart || !detailItem || !user) {
      return
    }

    setLoading(true)

    const isSuccess = await pushPlaceLists(
      user.id as string | number,
      detailItem
    )

    if (!isSuccess) {
      console.log('error')
    }

    placeLists()
  }

  return (
    <Button
      loading={loading}
      shape="circle"
      type={heart ? 'primary' : 'default'}
      icon={
        heart ? <HeartFilled style={{ color: 'white' }} /> : <HeartOutlined />
      }
      onClick={handleClick}
    />
  )
}

export default LikesPlace
