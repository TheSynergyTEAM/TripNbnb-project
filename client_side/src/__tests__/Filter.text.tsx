import Filter from 'components/map/menu/Filter'
import { render, RenderResult } from '@testing-library/react'

let wrapper: RenderResult | null = null

beforeEach(() => {
  wrapper = render(<Filter />)
})

describe('Filter Component', () => {
  test('Should has 3 check boxes', () => {
    expect(wrapper?.getByText('관광 명소')).toBeInTheDocument()
    expect(wrapper?.getByText('숙박 시설')).toBeInTheDocument()
    expect(wrapper?.getByText('음식점')).toBeInTheDocument()
  })

  test('Should be checked all check boxes', () => {
    expect(wrapper?.getByText('관광 명소').parentNode).toHaveClass(
      'ant-checkbox-wrapper-checked'
    )
    expect(wrapper?.getByText('숙박 시설').parentNode).toHaveClass(
      'ant-checkbox-wrapper-checked'
    )
    expect(wrapper?.getByText('음식점').parentNode).toHaveClass(
      'ant-checkbox-wrapper-checked'
    )
  })

  test('Should not be checked occurred click event', () => {
    const v = wrapper?.getByText('관광 명소')
    v?.click()
    expect(v?.parentNode).not.toHaveClass('ant-checkbox-wrapper-checked')
  })
})
