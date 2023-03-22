import "vitest-dom/extend-expect"
import { render, screen } from '@testing-library/react'
import Instructions from './Instructions'


describe("Instructions component", () => {
  const someStyle = { myCenter: "someClass" }

  beforeEach(() => {
    render(<Instructions styles={someStyle} />)
  })

  const numberBox = () => screen.getByRole('textbox', { name: /choose an initial number/i })

  test("should render", () => {
    expect(screen.getByRole('heading')).toBeDefined()
    expect(screen.getByRole('textbox')).toBeDefined()
    expect(screen.getAllByRole('button')).toBeDefined()
  })

  test("should have initial number value as 0", () => {
    expect(numberBox()).toHaveValue('0')
  })
})