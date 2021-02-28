import { MarkerContextType } from 'context/Marker'
import { MouseClick, MouseOut, MouseOver, Register } from 'event/Marker'
import { renderToString } from 'react-dom/server'
import HighlightOverlay from './HighlightOverlay'

type Status = daum.maps.services.Status

interface SearchCategory {
  category: string
  marker: string
}

const shouldSearchCategories: Array<SearchCategory> = [
  {
    category: 'AT4',
    marker: 'marker-t.png'
  },
  {
    category: 'AD5',
    marker: 'marker-s.png'
  },
  {
    category: 'FD6',
    marker: 'marker-r.png'
  }
]

// 현재 오버레이를 교체하기 위한 클로져
function highlightOverlayState() {
  let overlay: daum.maps.CustomOverlay | null = null

  return {
    setOverlay(_overlay: daum.maps.CustomOverlay, map?: daum.maps.Map) {
      if (overlay) {
        overlay.setMap(null)
      }
      if (map) {
        overlay = _overlay
        overlay.setMap(map)
      }
    },
    getOverlay() {
      return overlay
    }
  }
}

const hOverlayState = highlightOverlayState()

function initMarker(
  item: ResultItem,
  cat: SearchCategory,
  ctx: MarkerContextType
): void {
  const markerImageObj = {
    src: process.env.PUBLIC_URL + `/images/${cat.marker}`,
    size: new daum.maps.Size(32, 32),
    option: {}
  }
  const markerImage = new daum.maps.MarkerImage(
    markerImageObj.src,
    markerImageObj.size,
    markerImageObj.option
  )
  // 마커 생성
  const marker = new daum.maps.Marker({
    position: new daum.maps.LatLng(parseFloat(item.y), parseFloat(item.x)),
    image: markerImage
  })
  // 이벤트 등록 (MouseOver)
  Register(marker, 'mouseover', MouseOver(marker, ctx, item))
  // 이벤트 등록 (MouseOut)
  Register(marker, 'mouseout', MouseOut(ctx))
  // 이벤트 등록 (MouseClick)
  Register(marker, 'click', MouseClick(ctx, item))

  ctx.setDisplayMarkers((state: any) => [...state, { marker, item }])
}

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
  item: ResultItem | null,
  ctx: MarkerContextType,
  places?: daum.maps.services.Places | null,
  map?: daum.maps.Map | null
) => {
  // 리스트 아이템에서 클릭한 이벤트일 시
  // 해당 아이템의 위치로 맵을 옮김
  if (item && map) {
    map.setCenter(new daum.maps.LatLng(parseFloat(item.y), parseFloat(item.x)))
    // 오버레이 생성
    if (
      shouldSearchCategories.filter(
        (sc) => sc.category === item.category_group_code
      ).length
    ) {
      const content = renderToString(
        <HighlightOverlay title={item.place_name} />
      )

      // @ts-ignore
      const overlay = new daum.maps.CustomOverlay({
        position: map.getCenter(),
        content,
        zIndex: 50,
        xAnchor: 0.55,
        yAnchor: 2
      })

      hOverlayState.setOverlay(overlay, map)
    }
  }

  // 리스트 아이템 클릭 이벤트면 아이템의 좌표 값으로 바인딩
  // 현재 위치 재검색 이벤트면 현재 맵 좌표 값으로 바인딩
  const x = item ? item.x : map?.getCenter().getLng()
  const y = item ? item.y : map?.getCenter().getLat()

  shouldSearchCategories.forEach((cat) => {
    places?.categorySearch(
      // @ts-ignore
      cat.category,
      (result, status, pagenation) => {
        if (status === daum.maps.services.Status.OK) {
          if (pagenation.hasNextPage) {
            // 모든 검색 결과에 대해서 마커 찍기
            pagenation.nextPage()
          }
          if (result.length) {
            result.forEach((item) => {
              if (map) {
                initMarker(item, cat, ctx)
              }
            })
          }
        }
      },
      { x, y }
    )
  })
}
