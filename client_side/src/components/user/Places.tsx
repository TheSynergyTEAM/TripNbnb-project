import Divider from './Divider'

interface UserPlacesProps {
  place: Array<{ a: string; b: string }>
}

const Places: React.FC<UserPlacesProps> = ({ place }) => {
  return (
    <Divider title="좋아요 누른 플레이스">
      {place.length ? <div>Todo List</div> : <div>좋아요 누른 장소 없음</div>}
    </Divider>
  )
}

export default Places
