import axios, { AxiosError } from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_SUBMIT_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const submitPost = async (data: unknown) => {
  try {
    const dataToSend = JSON.stringify(data)
    const res = await client.post('/', dataToSend)
    
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
