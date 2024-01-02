import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import store from './app/store'
import EditInvoice from './pages/EditInvoice'
import Error from './pages/ErrorPage'
import Invoices from './pages/Invoices'
import Layout from './pages/Layout'
import SingleInvoice from './pages/SingleInvoice'

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
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
