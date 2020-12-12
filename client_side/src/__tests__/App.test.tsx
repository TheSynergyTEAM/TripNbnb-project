import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders default text', () => {
  render(<App />)
  const linkElement = screen.getByText(/Default App/i)
  expect(linkElement).toBeInTheDocument()
})
