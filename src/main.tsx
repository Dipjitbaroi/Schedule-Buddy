import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.tsx'
import AuthProvider from './Auth/AuthProvider.tsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from './stateManagement/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster toastOptions={{
          style: {
            backgroundColor: '#fafbff'
          }
        }} />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
