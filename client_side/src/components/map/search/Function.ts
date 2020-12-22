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
