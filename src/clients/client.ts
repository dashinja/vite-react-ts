import { type CountActionType } from '../utilities/reducers'

/**
 * Calls AWS Lambda Gateway
 */
export const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_SUBMIT_URL
  : import.meta.env.VITE_SUBMIT_URL_DEV

const headers = new Headers()
headers.append('Content-Type', 'application/json')

/**
 * Adds to list
 */
export const submitPost = async (data: CountActionType['value']) => {
  if (data) {
    try {
      interface DataToSend {
        body: string
      }

      const dataTransform = (data: number): DataToSend => ({
        body: data.toString(),
      })

      const dataToSend = dataTransform(data)

      const fetchPost = new Request(baseURL, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers,
      })

      const response = await fetch(fetchPost)

      if (!response.ok) {
        throw new Error('Network Response was Not OK')
      } else {
        return response
      }
    } catch (error) {
      console.error('Problem with submitPost Fetch Operation')
    }
  }
  throw new Error('No data for submitPost')
}

/**
 * Retrieves list value
 */
export const getList = async (): Promise<number[]> => {
  const getRequest = new Request(baseURL, { headers })
  const fetchData = await fetch(getRequest)
  return await fetchData.json()
}

/**
 * Deletes list value
 */
export const deleteList = async () => {
  const deleteRequest = new Request(baseURL, { method: 'DELETE' })

  return await fetch(deleteRequest)
}
