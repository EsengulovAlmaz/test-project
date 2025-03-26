import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Flex, Spin } from 'antd'

import { DetailCard } from '../../components/DetailCard/DetailCard'
import AppLayout from '../../components/Layout/AppLayout'
import { useViewProduct } from '../../store/product'

import cls from './ViewProduct.module.css'

const ViewProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = useViewProduct(state => state.product)
  const loading = useViewProduct(state => state.loading)
  const fetchProduct = useViewProduct(state => state.fetchProduct)

  React.useEffect(() => {
    fetchProduct(id)
  }, [id])

  if(loading) return (
    <Flex justify="center" align="center" style={{ height: '90vh' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </Flex>
  )

  return (
    <AppLayout>
      <Flex className={cls.view_product}>
        <Flex>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />

          <div className={cls.view_product__block}>
            <img 
              src={product?.image}
              alt="image"
              className={cls.view_product__img}
            />
          </div>
        </Flex>
        <DetailCard title="ID" value={product?.id} />
        <DetailCard title="Название" value={product?.title} />
        <DetailCard title="Описание" value={product?.description} />
        <DetailCard title="Категория" value={product?.category} />
        <DetailCard title="Цена" value={product?.price} />
        <DetailCard title="Количество" value={product?.rating.count} />
        <DetailCard title="Рейтинг" value={product?.rating.rate} />
      </Flex>
    </AppLayout>
  )
}

export default ViewProduct