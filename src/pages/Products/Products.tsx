import React from 'react'

import { Empty, Flex, Pagination, Select } from 'antd'

import { LoadingImage } from '../../assets/img'
import AppLayout from '../../components/Layout/AppLayout'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useProducts } from '../../store/products'

import cls from './Products.module.css'

const options = [
  { label: 'Все', value: 'all', filter_key: 'all' },
  { label: 'Избранные', value: true, filter_key: 'is_favorite' },
  { label: 'Мужская одежда', value: 'men\'s clothing', filter_key: 'category' },
  { label: 'Ювелирные изделия', value: 'jewelery', filter_key: 'category' },
  { label: 'Женская одежда', value: 'women\'s clothing', filter_key: 'category' },
  { label: 'Электроника', value: 'electronics', filter_key: 'category' },
]

const ProductsPage = () => {
  const products = useProducts(state => state.products)
  const loading = useProducts(state => state.loading)
  const pageSize = useProducts(state => state.pageSize)
  const currentPage = useProducts(state => state.currentPage)
  const setPage = useProducts(state => state.setPage)
  const fetchProducts = useProducts(state => state.fetchProducts)
  const filterProducts = useProducts(state => state.filterProducts)

  const startIndex = (currentPage - 1) * pageSize
  const paginatedProducts = products.slice(startIndex, startIndex + pageSize)

  const handleSelectChange = (value: string) => {
    const selectedOption = options.find(option => option.value === value)

    if(selectedOption) filterProducts(selectedOption.value, selectedOption.filter_key)
  }

  React.useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <AppLayout>
      <Flex justify="space-between" align="center">
        <h2 className={cls.products__title}>Все продукты</h2>

        <Select
          className={cls.filter}
          options={options}
          placeholder="Фильтрация"
          onChange={handleSelectChange}
        />
      </Flex>

      {
        !products.length && (
          <Flex 
            justify="center" 
            align="center"
          >
            <Empty />
          </Flex>
        )
      }

      <div className={cls.products__wrapper}>
        {loading 
          ? Array.from({ length: 12 }).map((_, index) => (
            <ProductCard key={index} loading={true} title="card title" image={LoadingImage} />
          ))
          : paginatedProducts.map(item => <ProductCard key={item.id} {...item} />)
        }
      </div>

      {
        !!products.length && (
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={products.length}
            onChange={setPage}
            className={cls.pagination}
            align="center"
          />
        )
      }
    </AppLayout>
  )
}

export default ProductsPage