import { setupServer } from 'msw/node'
import { handlers, rest } from './handlers'

export const server = setupServer(...handlers)
export { rest }
