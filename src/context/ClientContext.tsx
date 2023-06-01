import type React from 'react'
import { createContext, useContext } from 'react'
import { type CountActionType } from '../utilities/reducers'
import { type AxiosResponse } from 'axios'
import { submitPost, getList, deleteList } from '../clients/client'

interface ClientContext {
  submitPost: (
    data: CountActionType['value']
  ) => Promise<AxiosResponse<any, any> | undefined>
  getList: () => Promise<number[]>
  deleteList: () => Promise<AxiosResponse<any, any>>
}

const initClientContext: ClientContext = {
  submitPost,
  getList,
  deleteList,
}

const CreatedClientContext = createContext<ClientContext>(initClientContext)

export const ClientContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <CreatedClientContext.Provider value={{ ...initClientContext }}>
      {children}
    </CreatedClientContext.Provider>
  )
}

export const useClientContext = () => {
  const context = useContext(CreatedClientContext)
  if (!context) {
    console.log('Error about to happen!')
    throw new Error(
      'useClientContext must be used within ClientContextProvider'
    )
  }
  return context
}
