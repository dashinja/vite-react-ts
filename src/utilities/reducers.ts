export type CountActionType = {
  type: 'changed_input' | '+1' | '-1'
  value?: number
}

export const InitialActionType: CountActionType = {
  type: '+1',
}

export function countReducer(
  state: CountActionType,
  action: CountActionType
): CountActionType {
  switch (action.type) {
    case 'changed_input':
      return {
        ...state,
        value: action.value,
      }

    case '+1':
      return {
        ...state,
        value: state.value ? state.value + 1 : 1,
      }

    case '-1':
      return {
        ...state,
        value: state.value ? state.value - 1 : -1,
      }

    default:
      console.error('Unknown action type')
      return state
  }
}

export type SubmitStateType = {
  type: 'submitted'
  newValue: number
  arrayValue?: number[]
}

export const InitialSubmitState = {
  type: 'submitted',
  arrayValue: [],
  newValue: 0,
} as SubmitStateType

/**
 * Currently unused in favor of backend calls via client.ts
 */
export const submitReducer = (
  state: SubmitStateType,
  action: SubmitStateType
) => {
  switch (action.type) {
    case 'submitted':
      return {
        ...state,
        arrayValue: state.arrayValue?.length
          ? [...state.arrayValue, action.newValue]
          : [action.newValue],
      } as unknown as SubmitStateType

    default:
      console.error('Unknown action type')
      return state
  }
}

export default {
  submitReducer,
  countReducer,
}
