import { Carousel, CarouselProps, Image } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import SearchDetailContext from 'context/SearchDetail'
import { useCallback, useContext } from 'react'

const PlaceCarousel: React.FC<CarouselProps> = (props) => {
  const { customPlace } = useContext(SearchDetailContext)
  const { lg } = useBreakpoint()

  const resHeight = useCallback(() => {
    return lg ? '500px' : '300px'
  }, [lg])

  return (
    customPlace && (
      <Carousel
        {...props}
        style={{
          margin: '1rem 0',
          height: resHeight(),
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {customPlace.images.map((image) => (
          <Image
            src={image}
            key={image}
            width="100%"
            height={resHeight()}
            style={{ overflow: 'hidden' }}
            preview={{ mask: null, src: image }}
          />
        ))}
      </Carousel>
    )
  )
}

export default PlaceCarousel
