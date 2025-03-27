import { create } from 'zustand'

import { axiosInstance } from '../configs/axios'
import { ProductItem } from '../types/products'

import { useProducts } from './products'

interface State {
  product: ProductItem | null
  loading: boolean
  error: string | null
  fetchProduct: (id: number | undefined) => Promise<void>
}

export const useViewProduct = create<State>((set) => ({
  product: null,
  loading: false,
  error: null,
  fetchProduct: async (id) => {
    set({ loading: true, error: null })

    const productFromStore = useProducts.getState().products.find((item: ProductItem) => item.id === id)

    if (productFromStore) {
      set({ product: productFromStore, error: null, loading: false })
      return
    }

    try {
      const res = await axiosInstance.get(`/products/${id}`)
    
      if (res.status !== 200) {
        throw new Error('Ошибка при получении продукта.')
      }

      useProducts.getState().addProduct(res.data)

      set({ 
        product: res.data,
        error: null,
      })
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      set({ loading: false })
    }
  },
}))