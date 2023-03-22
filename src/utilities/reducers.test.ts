import { CountActionType, countReducer, InitialActionType } from './reducers'

import {expect, test, describe } from 'vitest'

describe("DispatchCount", () => {
  test("reducer should add 1 successfully", () => {
    let countState = {
      type: '+1',
      value: 0
    }

    const newState = countReducer(countState as CountActionType, {type: '+1', value: 0} )

    expect(newState.value).toBe<CountActionType['value']>(1)
  })
  test("reducer should subtract 1 successfully", () => {
    let countState = {
      type: '-1',
      value: 0
    }

    const newState = countReducer(countState as CountActionType, {type: '-1', value: 0} )

    expect(newState.value).toBe<CountActionType['value']>(-1)
  })
  test("reducer should update value properly when changed", () => {
    let countState = {
      type: 'changed_input',
      value: 0
    }

    const newState = countReducer(countState as CountActionType, {type: 'changed_input', value: 15} )

    expect(newState.value).toBe<CountActionType['value']>(15)
  })
})
