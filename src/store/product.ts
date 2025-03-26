import { create } from 'zustand'

import { axiosInstance } from '../configs/axios'
import { ProductItem } from '../types/products'

interface State {
  product: ProductItem | null
  loading: boolean
  error: string | null
  fetchProduct: (id: string | undefined) => Promise<void>
}

export const useViewProduct = create<State>((set) => ({
  product: null,
  loading: false,
  error: null,
  fetchProduct: async (id) => {
    set({ loading: true, error: null })

    try {
      const res = await axiosInstance.get(`/products/${id}`)
    
      if (res.status !== 200) {
        throw new Error('Ошибка при получении продукта.')
      }
    
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