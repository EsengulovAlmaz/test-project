import { Link, useLocation, useNavigate } from 'react-router-dom'

import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Layout } from 'antd'

import { useProducts } from '../../store/products'

import cls from './Header.module.css'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchProducts = useProducts(state => state.searchProducts)

  return (
    <Layout.Header className={cls.header}>
      <Flex className={cls.header__wrapper}>
        <h1 className={cls.header__title}>
          <Link to="/products">
            Logo
          </Link>
        </h1>

        {
          location.pathname === '/products' && (
            <div className={cls.search}>
              <Input
                placeholder="Поиск..."
                size="large"
                variant="underlined"
                onChange={e => searchProducts(e.target.value)}
              />
            </div>
          )
        }

        
        <Button
          onClick={() => navigate('/create-product')}
          icon={<PlusCircleOutlined className={cls.header__create} />}
          shape="circle"
        />
      </Flex>
    </Layout.Header>
  )
}

export default Header