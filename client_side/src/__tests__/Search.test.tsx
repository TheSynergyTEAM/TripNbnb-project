import { fireEvent, render, screen } from '@testing-library/react'
import SearchContext from 'context/Search'
import SearchBar from 'components/search/Bar'
import SearchResult from 'components/search/Result'

describe('Basic rendering in Bar Components', () => {
  beforeEach(() =>
    render(
      <SearchContext.Provider
        value={{ resultItem: [], setSearchResult: jest.fn(), keyword: '' }}
      >
        <SearchBar />
      </SearchContext.Provider>
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
      <SearchContext.Provider
        value={{ resultItem: [], setSearchResult: jest.fn(), keyword: '' }}
      >
        <SearchResult />
      </SearchContext.Provider>
    )
  )

  test('Render no data message when mounted component', () => {
    expect(screen.getByText('데이터가 없습니다.')).toBeInTheDocument()
  })
})
