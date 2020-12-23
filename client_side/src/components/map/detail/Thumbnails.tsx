import { Carousel, Image } from 'antd'

interface ThumbnailsComponentProps {
  thumbnails: any[]
}

const Thumbnails: React.FC<ThumbnailsComponentProps> = ({ thumbnails }) => {
  return thumbnails.length ? (
    <Carousel effect="fade" autoplay style={{ height: '200px' }}>
      {thumbnails.map((item, index, _) => (
        <Image
          placeholder={<Image src="https://via.placeholder.com/350x200" />}
          preview={false}
          key={index}
          src={item}
          width="100%"
          height="200px"
        />
      ))}
    </Carousel>
  ) : null
}

export default Thumbnails
