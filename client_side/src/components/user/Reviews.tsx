import Divider from './Divider'
import { FetchReview } from './hooks/user-hooks'

interface UserReviewsProps {
  review: FetchReview[] | []
}

const Reviews: React.FC<UserReviewsProps> = ({ review }) => {
  return (
    <Divider title="작성한 리뷰">
      {review.length ? <div>Todo List</div> : <div>등록된 리뷰 없음</div>}
    </Divider>
  )
}

export default Reviews
