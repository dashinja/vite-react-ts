import { deleteList, getList, submitPost, baseURL as baseUrl } from './client'
import { waitFor } from '@testing-library/react'
import { rest, server } from '../../vitest.setup'

describe('Client', () => {
  test('should return a list when calling getList', async () => {
    // custom override for the GET response handler function
    server.use(
      rest.get(baseUrl, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json([1, 2, 3]))
      })
    )

    const posts = await getList()
    expect(posts.length).toBe(3)
  })

  test('should return the updated list after calling submitPost', async () => {
    const posts = await submitPost(4)
    expect(posts?.data.length).toBe(4)
  })

  test('should delete the list when calling deleteList', async () => {
    expect(await getList()).toHaveLength(0)

    await submitPost(4)

    await waitFor(async () => {
      await expect(getList()).resolves.toHaveLength(4)
    })

    await deleteList()
    await waitFor(async () => {
      await expect(getList()).resolves.toHaveLength(0)
    })
  })
})
