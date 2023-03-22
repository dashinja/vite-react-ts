import { describe, test, expect, vi } from 'vitest'
import {render, screen} from '@testing-library/react'

import Instructions, { StylesType } from './Instructions'

describe("Instructions component", () => {
  const myStyles = vi.fn().mockReturnValue({})

  test("should render", () => {
    render(<Instructions />)
    screen.logTestingPlaygroundURL()

    expect(screen.getByRole('heading')).toBeDefined()
    expect(screen.getByRole('textbox')).toBeDefined()
    expect(screen.getAllByRole('button')).toBeDefined()
  })

  // test 
})