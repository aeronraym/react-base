import { createRoot } from 'react-dom/client'
import AppRouter from './router'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import './index.css'

const queryClient = new QueryClient();
const savedTheme = localStorage.getItem('theme');

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
    <ToastContainer theme={savedTheme == 'dark' ? 'dark' : 'light'} />
  </QueryClientProvider>
)
