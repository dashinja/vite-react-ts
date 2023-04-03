import axios, { AxiosError } from 'axios';

console.log('import.meta.env.VITE_SUBMIT_URL: ', import.meta.env.VITE_SUBMIT_URL)


const client = axios.create({
  baseURL: import.meta.env.VITE_SUBMIT_URL,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

console.log("client.getUri(): ", client.getUri())

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
