import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
