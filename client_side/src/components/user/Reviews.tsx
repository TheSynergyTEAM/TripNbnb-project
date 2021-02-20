import { SecondaryText } from 'components/common/typography'
import UserProfileContext from 'context/UserProfile'
import { useContext } from 'react'
import Divider from './Divider'

const Reviews: React.FC = () => {
  const { user_reviews } = useContext(UserProfileContext)

  return (
    <Divider title="내 리뷰">
      {user_reviews.length ? (
        <div>{user_reviews.length}</div>
      ) : (
        <SecondaryText>작성한 리뷰가 없습니다.</SecondaryText>
      )}
    </Divider>
  )
}

export default Reviews
