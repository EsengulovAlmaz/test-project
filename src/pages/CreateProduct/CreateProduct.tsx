import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { nanoid } from 'nanoid'

import AppLayout from '../../components/Layout/AppLayout'
import { SelectField } from '../../components/SelectField/SelectField'
import { Textfield } from '../../components/TextField/TextField'
import { axiosInstance } from '../../configs/axios'
import { useProducts } from '../../store/products'
import { ProductItem } from '../../types/products'
import { ProductRules } from '../../utils/validation'

import cls from './CreateProduct.module.css'

const CreateProduct = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const addProduct = useProducts(state => state.addProduct)
  const [form] = useForm()

  const onSubmit = async (body: ProductItem) => {
    setIsLoading(true)
    try {
      const res = await axiosInstance.post('/products', body)

      console.log(res)
      addProduct({
        ...res.data,
        rating: {
          count: 10,
          rate: 0,
        },
        is_favorite: false,
        id: nanoid(),
      })

      if(res.data) navigate('/products')
    } catch (e: any) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppLayout>
      <Form
        requiredMark={(title) => title}
        layout="vertical"
        autoComplete="off"
        scrollToFirstError
        className={cls.form}
        form={form}
        onFinish={onSubmit}
      >
        <h2>Создание продукта</h2>

        <Textfield 
          label="Введите название продукта:"
          placeholder="Название"
          name="title"
          rules={ProductRules.Title}
        />

        <Textfield 
          label="Введите цену продукта:"
          placeholder="Цена"
          name="price"
          rules={ProductRules.Price}
        />

        <Textfield 
          label="Введите описание продукта:"
          placeholder="Описание"
          name="description"
          rules={ProductRules.Description}
        />

        <SelectField
          label="Введите категорию продукта:"
          placeholder="Категория"
          name="category"
          data={[
            { label: 'men\'s clothing', value: 'men\'s clothing' },
            { label: 'jewelery', value: 'jewelery' },
            { label: 'electronics', value: 'electronics' },
            { label: 'women\'s clothing', value: 'women\'s clothing' },
          ]}
          required
        />

        <Textfield 
          label="Введите ссылку на фото продукта:"
          placeholder="Ссылка"
          name="image"
          rules={ProductRules.Image}
        />

        <Button
          type="primary"
          shape="round"
          size="large"
          iconPosition="end"
          htmlType="submit"
          loading={isLoading}
        >
          Создать
        </Button>
      </Form>
    </AppLayout>
  )
}

export default CreateProduct