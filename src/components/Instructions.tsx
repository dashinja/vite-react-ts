import { CountActionType, countReducer, InitialActionType, InitialSubmitState, submitReducer, SubmitStateType } from '../utilities/reducers'
import { useReducer } from 'react'

export type StylesType = {
  readonly [key: string]: string
}

type InstructionsProps = {
  styles?: StylesType
}

export default function Instructions({ styles }: InstructionsProps) {
  const [countState, dispatchCount] = useReducer(countReducer, InitialActionType)

  const [submittedState, dispatchSubmitted] = useReducer(submitReducer, InitialSubmitState)

  const previouslySubmittedValues = submittedState.arrayValue && submittedState.arrayValue.join(', ')

  return (
    <div className={styles?.myCenter || "nope"}>
      <h3>Main Page</h3>

      <form>
        <label htmlFor='initial-amount'>Choose an Initial Number</label>
        <br />
        <input
          id='initial-amount'
          type={'text'}
          onChange={(e) => {
            const isInputFilled = !Number.isNaN(parseInt(e.target.value))

            isInputFilled ?
              dispatchCount({
                type: 'changed_input',
                value: parseInt(e.target.value)
              } as CountActionType) :
              dispatchCount({
                type: 'changed_input',
                value: 0
              })
          }}
          value={countState.value}
        />
        <br />

        <button
          onClick={(e): void => {
            e.preventDefault()
            dispatchCount({
              type: '+1',
              value: countState.value
            } as CountActionType)
          }}
          data-testid={'+1'}
        >
          +1 Value
        </button>

        <button
          onClick={(e): void => {
            e.preventDefault()
            dispatchCount({
              type: '-1',
              value: countState.value
            } as CountActionType)
          }
          }
          data-testid={'-1'}

        >
          -1 Value
        </button>


        <button
          onClick={(e) => {
            e.preventDefault()
            dispatchSubmitted({
              type: 'submitted',
              arrayValue: submittedState.arrayValue,
              newValue: countState.value
            } as SubmitStateType)
          }}
          data-testid={'submit'}

        >
          Submit
        </button>
      </form>
      <div>
        <label htmlFor='prev-sub'>Previous Submissions</label>
        <div id='prev-sub'>{previouslySubmittedValues}</div>
      </div>
    </div>
  )
}