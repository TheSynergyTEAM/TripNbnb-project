import { fireEvent, render, screen } from '@testing-library/react'
import SearchContext from 'context/Search'
import SearchBar from 'components/search/Bar'
import SearchResult from 'components/search/Result'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const mockProvider = {
  loading: false,
  pagination: null,
  resultItem: [],
  keyword: '',
  setSearchResult: jest.fn(),
  setLoading: jest.fn(),
  setPagination: jest.fn()
}

describe('Basic rendering in Bar Components', () => {
  beforeEach(() =>
    render(
      <Router>
        <Switch>
          <SearchContext.Provider value={mockProvider}>
            <Route component={SearchBar} />
          </SearchContext.Provider>
        </Switch>
      </Router>
    )
  )

  test('Render input, button', () => {
    expect(screen.queryByPlaceholderText('장소를 입력하세요')).toBeTruthy()
    expect(screen.getByText('검색')).toBeInTheDocument()
  })

  test('Press enter in input', () => {
    const input = screen.queryByPlaceholderText('장소를 입력하세요')
    const button = screen.getByText('검색').parentNode

    if (!input || !button) {
      throw new Error('No input or button element in jsdom')
    }

    fireEvent.keyDown(input, { key: 'enter' })
    expect(input).toBeDisabled()
    expect(button).toBeDisabled()
  })
})

describe('Basic rendering in List Components', () => {
  beforeEach(() =>
    render(
      <SearchContext.Provider value={mockProvider}>
        <SearchResult />
      </SearchContext.Provider>
    )
  )

  test('Render no data message when mounted component', () => {
    expect(screen.getByText('키워드로 검색을 해주세요.')).toBeInTheDocument()
  })
})
