import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import store from './app/store'
import Error from './pages/ErrorPage'
import Invoices from './pages/Invoices'
import Layout from './pages/Layout'
import Login from './pages/Login.jsx'
import SingleInvoice from './pages/SingleInvoice'

import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Invoices />,
      },
      {
        path: '/invoices/:id',
        element: <SingleInvoice />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

function App() {
  return (
    <Provider store={store}>
      <SignedOut>
        <Login />
      </SignedOut>
      <SignedIn>
        <RouterProvider router={router} />
      </SignedIn>
      <ToastContainer />
    </Provider>
  )
}

export default App
