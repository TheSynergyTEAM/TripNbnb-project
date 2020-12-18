import { MarkerContext } from 'context/Marker'

// 이벤트 등록
const Register = (
  target: daum.maps.Marker,
  eventName: string,
  Fn: Function
) => {
  daum.maps.event.addListener(target, eventName, Fn)
}

const MouseOver = (marker: daum.maps.Marker, ctx: MarkerContext) => {
  return () => {
    // const mo = new daum.maps.CustomOverlay({
    //   position,
    //   content: `<div>Custom Overlay</div>`,
    //   zIndex: 10,
    //   yAnchor: 0.5
    // })
    ctx.setMarker(marker)
  }
}

const MouseOut = (ctx: MarkerContext) => {
  return () => {
    ctx.setMarker(null)
  }
}

export { Register }
export { MouseOver, MouseOut }
