import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Instructions from './Instructions'
import { submitPost } from '../clients/client'
import { vitest } from 'vitest'

vitest.mock('../clients/client.ts')

describe('Instructions component', () => {
  const someStyle = { myCenter: 'someClass' }

  beforeEach(() => {
    render(<Instructions styles={someStyle} />)
  })

  const numberBox = async () =>
    await screen.findByRole('textbox', { name: /choose an initial number/i })

  const plusButton = () => screen.getByTestId('+1')
  const minusButton = () => screen.getByTestId('-1')
  const submitButton = () => screen.getByTestId('submit')

  test('should render', () => {
    expect(screen.getByRole('heading')).toBeDefined()
    expect(screen.getByRole('textbox')).toBeDefined()
    expect(screen.getAllByRole('button')).toBeDefined()

    expect(screen.getByRole('heading')).toBeVisible()
    expect(screen.getByRole('textbox')).toBeVisible()
    expect(screen.getByTestId('+1')).toBeVisible()
  })

  test('should have submit button disabled when without input', async () => {
    const box = await numberBox()
    expect(box).toHaveTextContent('')
    expect(submitButton()).toBeDisabled()
  })

  test('should increment number in textbox by one when selecting +1 Value button', async () => {
    expect(await numberBox()).toHaveValue('')

    const addOne = plusButton()
    void userEvent.click(addOne)

    await waitFor(async () => {
      expect(await numberBox()).toHaveValue('1')
    })

    void userEvent.click(addOne)

    await waitFor(async () => {
      expect(await numberBox()).toHaveValue('2')
    })
  })

  test('should decrement number in textbox by one when selecting -1 Value button', async () => {
    expect(await numberBox()).toHaveValue('')

    const subtractOne = minusButton()
    void userEvent.click(subtractOne)

    await waitFor(async () => {
      expect(await numberBox()).toHaveValue('-1')
    })

    void userEvent.click(subtractOne)

    await waitFor(async () => {
      expect(await numberBox()).toHaveValue('-2')
    })
  })

  test('should call the submitPost function when the submit button is clicked', async () => {
    const buttonToSubmit = submitButton()
    const addOneButton = plusButton()

    void userEvent.click(addOneButton)
    void userEvent.click(addOneButton)

    void userEvent.click(buttonToSubmit)

    await waitFor(() => {
      expect(submitPost).toHaveBeenCalledOnce()
      expect(submitPost).toHaveBeenCalledWith(2)
    })
  })
})
