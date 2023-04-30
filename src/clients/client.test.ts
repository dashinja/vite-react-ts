import { deleteList, getList, submitPost } from './client'
import { waitFor } from '@testing-library/react'


describe('Client', () => {
  test('should return a list when calling getList', async () => {
    const posts = await getList()
    expect(posts.length).toBe(0)

    await submitPost(4)
    await waitFor(() => expect(getList()).resolves.toHaveLength(4))
  })

  test('should delete the list when calling deleteList', async () => {
    await submitPost(4)

    await waitFor(() => expect(getList()).resolves.toHaveLength(4))

    await deleteList()
    await waitFor(() => expect(getList()).resolves.toHaveLength(0))
  })
})
