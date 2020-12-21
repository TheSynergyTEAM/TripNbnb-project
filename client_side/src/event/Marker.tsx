import { MarkerContext } from 'context/Marker'

// 이벤트 등록
const Register = (
  target: daum.maps.Marker,
  eventName: string,
  Fn: Function
) => {
  daum.maps.event.addListener(target, eventName, Fn)
}

const MouseOver = (
  marker: daum.maps.Marker,
  ctx: MarkerContext,
  markerPlace: ResultItem
) => () => {
  ctx.setMarker(marker)
  ctx.setMarkerPlace(markerPlace)
}

const MouseOut = (ctx: MarkerContext) => () => {
  ctx.setMarker(null)
  ctx.setMarkerPlace(null)
}

const MouseClick = (ctx: MarkerContext, markerPlace: ResultItem) => () => {
  ctx.setVisibleDetail(true)
  ctx.setDetailItem(markerPlace)
}

export { Register }
export { MouseOver, MouseOut, MouseClick }
