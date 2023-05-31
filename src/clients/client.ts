import axios, { AxiosError } from 'axios'
import { CountActionType } from '../utilities/reducers'

export const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_SUBMIT_URL
  : import.meta.env.VITE_SUBMIT_URL_DEV

/**
 * Calls AWS Lambda Gateway
 */
const client = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Adds to list
 */
export const submitPost = async (data: CountActionType['value']) => {
  if (data) {
    try {
      type DataToSend = { body: string }

      const dataTransform = (data: number): DataToSend => ({
        body: data.toString(),
      })

      const dataToSend = dataTransform(data)
      const res = await client.post('', JSON.stringify(dataToSend))

      if (axios.isAxiosError(data)) {
        console.error(data)
        throw new AxiosError('Axios Failed')
      } else {
        return res
      }
    } catch (error) {
      return undefined
    }
  }
}

/**
 * Retrieves list value
 */
export const getList = async (): Promise<number[]> =>
  (await client.get(client.getUri())).data

/**
 * Deletes list value
 */
export const deleteList = async () => await client.delete(client.getUri())
