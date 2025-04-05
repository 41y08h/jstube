'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/contexts/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import queryFn from '@/lib/queryFunction'
import { toast } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@mui/material'
import theme from '@/lib/theme'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { queryFn, staleTime: 5 * 60 * 1000, refetchOnMount: 'always' },
    mutations: {
      onError(error, variables, context) {
        if (error instanceof AxiosError) {
          toast(error?.response?.data.message, {
            type: 'error',
            hideProgressBar: true,
          })
        }
      },
    },
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <AppRouterCacheProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <body>
              <AuthProvider>
                {children}
                <ToastContainer
                  position='bottom-left'
                  newestOnTop={true}
                  style={{ maxWidth: '100%' }}
                />
              </AuthProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </body>
          </ThemeProvider>
        </QueryClientProvider>
      </AppRouterCacheProvider>
    </html>
  )
}
