import axios, { AxiosError } from 'axios';
import { CountActionType } from '../utilities/reducers'

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_SUBMIT_URL : import.meta.env.VITE_SUBMIT_URL_DEV

const client = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const submitPost = async (data: CountActionType['value']) => {
  try {

    type DataToSend = { body: number}
    
    const dataTransform = (data: number): DataToSend => ({ "body": data })

    const dataToSend = dataTransform(data)
    const res = await client.post('', dataToSend)

    console.log("I'm res.data WOO$$$$$: ", res.data)

    if (axios.isAxiosError(data)) {
      console.error(data)
      throw new AxiosError("Axios Failed");
    } else {
      return res
    }
  } catch (error) {
    return undefined
  }
}

export const getList = async (): Promise<number[]> => (await client.get(client.getUri())).data

export const deleteList = async () => await client.delete(client.getUri())