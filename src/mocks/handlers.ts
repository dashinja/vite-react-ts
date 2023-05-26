import { rest } from 'msw'

const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_SUBMIT_URL
  : import.meta.env.VITE_SUBMIT_URL_DEV

export const handlers = [
  rest.get(baseURL, (req, res, ctx) => {
    const listValue = sessionStorage.getItem('listValue')

    return res(ctx.status(200), ctx.json(JSON.parse(listValue || '[]')))
  }),

  rest.post(baseURL, (req, res, ctx) => {
    const postValue = [1, 2, 3, 4]

    sessionStorage.setItem('listValue', JSON.stringify(postValue))

    return res(ctx.status(200), ctx.json(postValue))
  }),

  rest.delete(baseURL, (req, res, ctx) => {
    sessionStorage.removeItem('listValue')

    return res(ctx.status(204))
  }),

  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`)
    return res(ctx.status(500))
  }),
]

export { rest }
