import { createContext} from 'react';
import { CountActionType } from '../utilities/reducers'
import { AxiosResponse } from 'axios'
import { submitPost, getList, deleteList } from '../clients/client'

type ClientContext = {
  submitPost: (data: CountActionType['value']) => Promise<AxiosResponse<any, any> | undefined>

  getList: () => Promise<number[]>

  deleteList: () => Promise<AxiosResponse<any, any>>
}

const initClientContext: ClientContext = {
  submitPost,
  getList,
  deleteList
}

const clientContext = createContext<ClientContext>(initClientContext)

export default clientContext