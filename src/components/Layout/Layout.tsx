'use client'
import { FC, useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'

interface Props {
  children?: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(previous => !previous)

  return (
    <div className='flex flex-col h-screen'>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleIsOpen={toggleSidebar} />
      <div className='bg-white h-full'>{children}</div>
    </div>
  )
}

export default Layout
