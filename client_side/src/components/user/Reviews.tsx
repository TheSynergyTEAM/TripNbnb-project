import { SecondaryText } from 'components/common/typography'
import UserProfileContext, { UserReview } from 'context/UserProfile'
import { useContext } from 'react'
import Divider from './Divider'

type ReviewItemProps = {
  content: string
  place: string
}

const ReviewItem: React.FC<ReviewItemProps> = ({ content, place }) => {
  return (
    <div>
      {content}, {place}
    </div>
  )
}

const Reviews: React.FC = () => {
  const { user_reviews } = useContext(UserProfileContext)

  return (
    <Divider title="내 리뷰">
      {user_reviews.length ? (
        (user_reviews as UserReview[]).map((review, i) => (
          <ReviewItem key={i} content={review.review} place={review.place} />
        ))
      ) : (
        <SecondaryText>작성한 리뷰가 없습니다.</SecondaryText>
      )}
    </Divider>
  )
}

export default Reviews
