'use client'
import { FC, useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(previous => !previous)

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleIsOpen={toggleSidebar} />
      {children}
    </>
  )
}

export default Layout
