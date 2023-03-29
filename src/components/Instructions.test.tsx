import "vitest-dom/extend-expect"
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Instructions from './Instructions'


describe("Instructions component", () => {
  const someStyle = { myCenter: "someClass" }

  beforeEach(() => {
    render(<Instructions styles={someStyle} />)
  })

  const numberBox = () => screen.findByRole('textbox', { name: /choose an initial number/i })

  const plusButton = () => screen.getByTestId('+1')
  const minusButton = () => screen.getByTestId('-1')
  const submitButton = () => screen.getByTestId('submit')

  test("should render", () => {
    expect(screen.getByRole('heading')).toBeDefined()
    expect(screen.getByRole('textbox')).toBeDefined()
    expect(screen.getAllByRole('button')).toBeDefined()
  })

  test("should have initial number value as 0", async () => {
    expect(await numberBox()).toHaveValue('0')
  })

  test("should increment number in textbox by one when selecting +1 Value button", async () => {
    expect(await numberBox()).toHaveValue('0')

    const addOne = plusButton()
    userEvent.click(addOne)

    
    await waitFor(async () => {
      expect(await numberBox()).toHaveValue('1')
    })
    
    userEvent.click(addOne)
    
    await waitFor(async () => {
      expect(await numberBox()).toHaveValue('2')
    })
  })

  test("should decrement number in textbox by one when selecting -1 Value button", async () => {
    expect(await numberBox()).toHaveValue('0')

    const subtractOne = minusButton()
    userEvent.click(subtractOne)

    
    await waitFor(async () => {
      expect(await numberBox()).toHaveValue('-1')
    })
    
    userEvent.click(subtractOne)
    
    await waitFor(async () => {
      expect(await numberBox()).toHaveValue('-2')
    })
  })
})