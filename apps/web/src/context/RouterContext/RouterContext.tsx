import { RouterProvider } from 'react-router-dom'
import { router } from './router'

function RouterContext() {
  return <RouterProvider router={router} />
}

export default RouterContext
