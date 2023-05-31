import React, { createContext, useContext, useState } from 'react'
import { CountActionType } from '../utilities/reducers'
import { AxiosResponse } from 'axios'
import { submitPost, getList, deleteList } from '../clients/client'

type ClientContext = {
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

const ClientContext = createContext<ClientContext>(initClientContext)

export const ClientContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ClientContext.Provider value={{ ...initClientContext }}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClientContext = () => {
  const context = useContext(ClientContext)
  if (!context) {
    console.log('Error about to happen!')
    throw new Error(
      'useClientContext must be used within ClientContextProvider'
    )
  }
  return context
}
