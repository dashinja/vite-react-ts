import * as matchers from 'vitest-dom/matchers'
import { expect } from 'vitest'
import { server, rest } from './src/mocks/server'
import 'vitest-dom/extend-expect'
expect.extend(matchers)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  sessionStorage.clear()
})
afterAll(() => {
  server.close()
})

export { rest, server }
