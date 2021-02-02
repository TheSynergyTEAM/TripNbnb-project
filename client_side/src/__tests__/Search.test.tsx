import { render, screen } from '@testing-library/react'
import SearchContext from 'context/Search'
import SearchBar from 'components/search/Bar'

beforeEach(() =>
  render(
    <SearchContext.Provider
      value={{ resultItem: [], setSearchResult: jest.fn() }}
    >
      <SearchBar />
    </SearchContext.Provider>
  )
)

describe('Basic rendering', () => {
  test('render input, button', () => {
    expect(screen.queryByPlaceholderText('장소를 입력하세요')).toBeTruthy()
    expect(screen.getByText('검색')).toBeInTheDocument()
  })
})
