import { MarkerContextType } from 'context/Marker'
import { MouseClick, MouseOut, MouseOver, Register } from 'event/Marker'

type Status = daum.maps.services.Status

export const placeSearch = (
  places: daum.maps.services.Places | any,
  keyword: string,
  code: string,
  Fn: Function
) => {
  const results: Array<ResultItem> = []

  places?.keywordSearch(
    keyword,
    (
      result: Array<ResultItem>,
      status: Status,
      pagination: daum.maps.Pagination
    ) => {
      if (status === daum.maps.services.Status.OK) {
        if (pagination.hasNextPage) {
          results.push(...result)
          pagination.nextPage()
        } else {
          results.push(...result)

          const filterCodeResults = results.filter(
            (item) => item.category_group_code === code
          )
          const filterWithoutCodeResults = results.filter(
            (item) => item.category_group_code !== code
          )

          Fn(filterCodeResults, filterWithoutCodeResults)
        }
      }
    }
  )
}

export const categorySearch = (
  item: ResultItem,
  ctx: MarkerContextType,
  places?: daum.maps.services.Places | null,
  map?: daum.maps.Map | null
) => {
  // 맵 이동
  map?.setCenter(new daum.maps.LatLng(parseFloat(item.y), parseFloat(item.x)))
  // 카테고리로 검색 (AT4: 여행지, 관광명소)
  places?.categorySearch(
    // @ts-ignore
    'AT4',
    (result, status, pagenation) => {
      if (status === daum.maps.services.Status.OK) {
        if (pagenation.hasNextPage) {
          // 모든 검색 결과에 대해서 마커 찍기
          pagenation.nextPage()
        }
        if (result.length) {
          result.forEach((item) => {
            // 마커 생성
            const marker = new daum.maps.Marker({
              position: new daum.maps.LatLng(
                parseFloat(item.y),
                parseFloat(item.x)
              )
            })
            // 이벤트 등록 (MouseOver)
            Register(marker, 'mouseover', MouseOver(marker, ctx, item))
            // 이벤트 등록 (MouseOut)
            Register(marker, 'mouseout', MouseOut(ctx))
            // 이벤트 등록 (MouseClick)
            Register(marker, 'click', MouseClick(ctx, item))
            // 맵에 마커를 찍음
            marker.setMap(map as daum.maps.Map)

            ctx.setDisplayMarkers((state: any) => [...state, marker])
          })
        }
      }
    },
    // 현재 위치 기준
    { x: parseFloat(item.x), y: parseFloat(item.y) }
  )
}
