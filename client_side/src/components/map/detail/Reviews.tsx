import React, { useContext, useEffect } from 'react'
import MarkerContext from 'context/Marker'

interface ReviewsComponentProps {
  reviews: any[]
}

const Reviews: React.FC<ReviewsComponentProps> = ({ reviews }) => {
  const { detailItem } = useContext(MarkerContext)

  useEffect(() => {
    if (detailItem) {
      // console.log(detailItem)
    }
  }, [detailItem])

  return <div>reviews</div>
}

export default Reviews
