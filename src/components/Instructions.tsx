import { CountActionType, countReducer, InitialActionType, InitialSubmitState, submitReducer, SubmitStateType } from '../utilities/reducers'
import { MouseEventHandler, useCallback, useEffect, useReducer, useState } from 'react'
import { deleteList, getList, submitPost } from '../clients/client'

export type StylesType = {
  readonly [key: string]: string
}

type InstructionsProps = {
  styles?: StylesType
}

export default function Instructions({ styles }: InstructionsProps) {
  const [countState, dispatchCount] = useReducer(countReducer, InitialActionType)

  const [submittedState, dispatchSubmitted] = useReducer(submitReducer, InitialSubmitState)

  const [InitialList, setInitialList] = useState<number[]>();

  const previouslySubmittedValues = submittedState.arrayValue && submittedState.arrayValue.join(', ')

  const submitCall = async (dataToSubmit: number) => {
    try {
      const res = await submitPost(dataToSubmit)
      
      if (res) {
        const {data} = res
        return data
      }
    } catch (err) {
      console.error(err)      
      return undefined
    }
  }

  const submitHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    
    try {
      
    } catch (error) {
      
    }
    const res = await submitCall(countState.value)

    if (res) {
      dispatchSubmitted({
        type: 'submitted',
        arrayValue: submittedState.arrayValue,
        newValue: res.data
      } as SubmitStateType)

      await initializeList();
    }
  }

  const initializeList = async () => {
    const res = await getList()
    setInitialList(res)
    return res
  }

  useEffect(() => {
    initializeList()
  }, [])

  useCallback(() => {
    const initializeList = async () => {
      const res = await getList()
      setInitialList(res)
      return res
    }
    
    initializeList()
  }, [submitCall])

  const deleteHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    const deleteConfirmation = await deleteList()

    if (deleteConfirmation.status === 204) {
      await initializeList()
    }
  }

  return (
    <div className={styles?.myCenter || 'nope'}>
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
          onClick={submitHandler}
          data-testid={'submit'}
        >
          Submit
        </button>
      </form>
      <button
          onClick={deleteHandler}
          data-testid={'delete'}
        >
          Delete List
        </button>
      <div>
        <label htmlFor='prev-sub'>Previous Submissions</label>
        <div id='prev-sub'>{InitialList?.join(' ') || previouslySubmittedValues && previouslySubmittedValues}</div>
      </div>
    </div>
  )
}