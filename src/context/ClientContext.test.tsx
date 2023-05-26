import { type ReactNode } from 'react'
import { renderHook } from '@testing-library/react'
import { ClientContextProvider, useClientContext } from './ClientContext'
import { rest, server } from '../../vitest.setup'
import { baseURL as baseUrl } from '../clients/client'

describe('ClientContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ClientContextProvider>{children}</ClientContextProvider>
  )
  const { result } = renderHook(() => useClientContext(), { wrapper })
  const client = result.current

  test('returns the proper things', async () => {
    server.use(
      rest.get(baseUrl, (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json([1, 2, 3]))
      }),
      rest.post(baseUrl, (req, res, ctx) => {
        return res.once(ctx.status(201), ctx.json([1, 2, 3, 5]))
      })
    )

    const getListResult = await client.getList()
    const submitPostResult = await client.submitPost(5)
    const deleteListResult = await client.deleteList()

    expect(getListResult).toStrictEqual([1, 2, 3])
    expect(submitPostResult?.data).toStrictEqual([1, 2, 3, 5])
    expect(deleteListResult.status).toStrictEqual(204)
  })
})
