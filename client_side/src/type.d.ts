declare global {
  interface Window {
    Kakao: any
  }
  type ResultItem = daum.maps.services.PlacesSearchResultItem
  type LatLng = daum.maps.LatLng
}

export interface Window {}
