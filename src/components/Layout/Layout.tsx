'use client'
import { FC, useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import { AuthProvider } from '@/contexts/Auth'

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(previous => !previous)

  return (
    <AuthProvider>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleIsOpen={toggleSidebar} />
      {children}
    </AuthProvider>
  )
}

export default Layout
