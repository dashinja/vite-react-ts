import { deleteList, getList, submitPost } from './client'
import { server } from '../mocks/server'
import { waitFor } from '@testing-library/react'
import { rest } from 'msw'

const baseURL = import.meta.env.BASE_URL

describe('Client', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('getList should return a list of posts', async () => {
    const posts = await getList()
    expect(posts.length).toBe(0)

    await submitPost(4)
    await waitFor(() => expect(getList()).resolves.toHaveLength(4))
  })
})
