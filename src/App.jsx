import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import store from './app/store'
import EditInvoice from './pages/EditInvoice'
import Error from './pages/ErrorPage'
import Invoices from './pages/Invoices'
import Layout from './pages/Layout'
import SingleInvoice from './pages/SingleInvoice'
import {
  RedirectToSignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/clerk-react'

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
      {
        path: '/invoices/edit/:id',
        element: <EditInvoice />,
      },
    ],
  },
])

function App() {
  return (
    <Provider store={store}>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <RouterProvider router={router} />
      </SignedIn>
    </Provider>
  )
}

export default App
