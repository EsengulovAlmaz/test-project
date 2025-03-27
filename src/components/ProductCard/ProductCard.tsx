import React from 'react'
import { useNavigate } from 'react-router-dom'

import { DeleteOutlined, HeartFilled } from '@ant-design/icons'
import { Button, Card, Flex } from 'antd'

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
  const navigate = useNavigate()
  const toggleFavorite = useProducts(state => state.toggleFavorite)
  const deleteProduct = useProducts(state => state.deleteProduct)
  const deleting = useProducts(state => state.deleting)

  const goToProduct = () => {
    navigate(`/products/${id}`)
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
            loading={deleting}
            onClick={() => deleteProduct(id)}
          />

          <Button
            icon={<HeartFilled className={is_favorite ? cls.favorite : cls.not_favorite} />}
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