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

    // const dataTransform = (data: number): DataToSend => ({valuedata, id: 1})

    // const dataToSend = dataTransform(data)
    const res = await client.post('', data.toString())

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
