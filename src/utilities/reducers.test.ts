import { CountActionType, countReducer, submitReducer, SubmitStateType } from './reducers'

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

describe("DispatchSubmitted", () => {

  test("reducer should execute the submitted functionality properly", () => {
    let countState = {
      type: 'submitted',
      newValue: 5
    } as SubmitStateType
    
    let submitState = {
      type: 'submitted',
      arrayValue: [1],
      newValue: countState.newValue
    } as SubmitStateType

    const newState = submitReducer(countState, submitState)
  })
})
