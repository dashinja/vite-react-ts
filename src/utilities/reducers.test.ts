import {
  type CountActionType,
  countReducer,
  submitReducer,
  type SubmitStateType,
} from './reducers'

describe('DispatchCount', () => {
  test('reducer should add 1 successfully', () => {
    const countState = {
      type: '+1',
      value: 0,
    }

    const newState = countReducer(countState as CountActionType, {
      type: '+1',
      value: 0,
    })

    expect(newState.value).toBe<CountActionType['value']>(1)
  })
  test('reducer should subtract 1 successfully', () => {
    const countState = {
      type: '-1',
      value: 0,
    }

    const newState = countReducer(countState as CountActionType, {
      type: '-1',
      value: 0,
    })

    expect(newState.value).toBe<CountActionType['value']>(-1)
  })
  test('reducer should update value properly when changed', () => {
    const countState = {
      type: 'changed_input',
      value: 0,
    }

    const newState = countReducer(countState as CountActionType, {
      type: 'changed_input',
      value: 15,
    })

    expect(newState.value).toBe<CountActionType['value']>(15)
  })
})

describe('DispatchSubmitted', () => {
  test('reducer should execute the submitted functionality properly', () => {
    const countState = {
      type: 'submitted: SubmitStateType',
      arrayValue: [1],
      newValue: 5,
    } as unknown as SubmitStateType

    const submitState: SubmitStateType = {
      type: 'submitted',
      newValue: countState.newValue,
    } as SubmitStateType

    const newState = submitReducer(countState, submitState)

    expect(newState.arrayValue).toStrictEqual<SubmitStateType['arrayValue']>([
      1, 5,
    ])
  })
})
