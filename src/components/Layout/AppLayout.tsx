import React from 'react'

import { Layout } from 'antd'

import Header from '../Header/Header'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Header />
      <Layout.Content style={{ padding: '20px 48px', minHeight: '90vh' }}>
        {children}
      </Layout.Content>
    </Layout>
  )
}

export default AppLayout