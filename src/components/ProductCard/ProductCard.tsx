import React from 'react'
import { useNavigate } from 'react-router-dom'

import { DeleteOutlined, HeartFilled } from '@ant-design/icons'
import { Button, Card, Flex } from 'antd'

import { axiosInstance } from '../../configs/axios'
import { useProducts } from '../../store/products'
import { ProductItem } from '../../types/products'

import cls from './ProductCard.module.css'

const { Meta } = Card

interface ProductCardProps extends Partial<ProductItem> {
  loading?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  is_favorite,
  loading = false,
}) => {
  const [isDeleted, setIsDeleted] = React.useState(false)
  const navigate = useNavigate()
  const toggleFavorite = useProducts(state => state.toggleFavorite)

  const goToProduct = () => {
    navigate(`/products/${id}`)
  }

  const onDelete = async (id: number | undefined) => {
    setIsDeleted(true)

    try {
      const res = await axiosInstance.delete(`/products/${id}`)

      console.log(res)
    } catch (e: any) {
      console.error(e)
    } finally {
      setIsDeleted(false)
    }
  }

  return (
    <Card
      onClick={goToProduct}
      loading={loading}
      className={cls.card}
      cover={
        <img
          className={cls.card_img}
          alt="example"
          src={image}
        />
      }
      actions={[
        <Flex justify="space-around" onClick={(e) => e.stopPropagation()}>
          <Button
            icon={<DeleteOutlined key="delete" />}
            type="text"
            loading={isDeleted}
            onClick={() => onDelete(id)}
          />

          <Button
            icon={<HeartFilled style={{ color: is_favorite ? 'red' : 'gray' }} />}
            type="text"
            onClick={() => toggleFavorite(id)}
          />
        </Flex>,
      ]}
      hoverable
    >
      <Meta
        title={title}
      />
    </Card>
  )
}

export default ProductCard