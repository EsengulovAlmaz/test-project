import React from 'react'

import { Layout } from 'antd'

import Header from '../Header/Header'

import cls from './AppLayout.module.css'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Header />
      <Layout.Content className={cls.content}>
        {children}
      </Layout.Content>
    </Layout>
  )
}

export default AppLayout