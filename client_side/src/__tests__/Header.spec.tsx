import { render, screen } from '@testing-library/react'
import Header from 'components/common/Header'
import { BrowserRouter as Router } from 'react-router-dom'

// TODO: replace to global mockup and ignore pattern mockup
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: () => {
      return {
        matches: false,
        addListener: () => {},
        removeListener: () => {}
      }
    }
  })
})

test('Render default project name', () => {
  render(
    <Router>
      <Header />
    </Router>
  )
  const text = screen.getByText(/TRIPNBNB/g)
  expect(text).toBeInTheDocument()
})
