import { Button } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import UserContext from 'context/User'
import { fetchPlaceLists, pushPlaceLists } from 'api/user'

type LikesPlaceProps = {
  place: daum.maps.services.PlacesSearchResultItem
  map?: boolean
}

const LikesPlace: React.FC<LikesPlaceProps> = ({ place, map }) => {
  const detailItem = place
  const onMap = map || false
  const { user, isLoggedIn, setPlaceLists } = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [heart, setHeart] = useState<boolean>(false)

  const placeLists = async () => {
    if (!isLoggedIn || !user) {
      setDisabled(true)
      setLoading(false)
      return
    }

    setLoading(true)

    const data = await fetchPlaceLists(user.id, true)

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
    setDisabled(false)
  }

  useEffect(() => {
    placeLists()
    // eslint-disable-next-line
  }, [isLoggedIn])

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
      disabled={disabled}
      loading={loading}
      shape="circle"
      type={heart ? 'primary' : 'default'}
      icon={
        heart ? <HeartFilled style={{ color: 'white' }} /> : <HeartOutlined />
      }
      onClick={handleClick}
      style={{ marginLeft: !onMap ? '5px' : '' }}
    />
  )
}

export default LikesPlace
