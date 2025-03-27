import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { axiosInstance } from '../configs/axios'
import { ProductItem } from '../types/products'

interface State {
  allProducts: ProductItem[]
  products: ProductItem[]
  loading: boolean
  deleting: boolean
  error: string | null
  currentPage: number
  pageSize: number
  deletedProductIds: number[]
  fetchProducts: () => Promise<void>
  setPage: (page: number, pageSize?: number) => void
  searchProducts: (value: string) => void
  toggleFavorite: (product_id?: number) => void
  addProduct: (product: ProductItem) => void
  filterProducts: (value: string | boolean, key: string) => void
  deleteProduct: (id: number | undefined) => void
}

export const useProducts = create<State>()(
  persist(
    (set, get) => ({
      allProducts: [],
      products: [],
      loading: false,
      deleting: false,
      error: null,
      currentPage: 1,
      pageSize: 8,
      deletedProductIds: [],

      fetchProducts: async () => {
        set({ loading: true, error: null })

        try {
          const res = await axiosInstance.get('/products')

          if (res.status !== 200) {
            throw new Error('Ошибка при получении продуктов.')
          }

          const deletedProductIds = get().deletedProductIds

          const filteredProducts = res.data.filter((item: ProductItem) => !deletedProductIds.includes(item.id))

          const localProducts = get().allProducts.filter((product: ProductItem) => !deletedProductIds.includes(product.id))

          const productsWithFavorite = [
            ...filteredProducts.filter(
              (item: ProductItem) => !localProducts.some((local) => local.id === item.id),
            ),
            ...localProducts,
          ].map((item: ProductItem) => ({
            ...item,
            is_favorite: item.is_favorite ?? false,
          }))
          
          set({
            allProducts: productsWithFavorite,
            products: productsWithFavorite,
            error: null,
          })
        } catch (error: any) {
          set({ error: error.message })
        } finally {
          set({ loading: false })
        }
      },

      addProduct: (product) => {
        const allProducts = get().allProducts
        set({
          allProducts: [product, ...allProducts],
          products: [product, ...allProducts],
        })
      },

      deleteProduct: async (id: number | undefined) => {
        if (id === undefined) {
          console.error('Не удалось удалить продукт: ID не определен.')
          return
        }

        set({ deleting: true, error: null })

        try {
          const deletedProductIds = get().deletedProductIds
          set({
            deletedProductIds: [...deletedProductIds, id],
          })

          const allProducts = get().allProducts
          const updatedAllProducts = allProducts.filter((item) => item.id !== id)

          set({
            allProducts: updatedAllProducts,
            products: updatedAllProducts,
          })

          const res = await axiosInstance.delete(`/products/${id}`)
        } catch (e: any) {
          console.error(e)
          set({ error: 'Ошибка при удалении продукта.' })
        } finally {
          set({ deleting: false })
        }
      },

      setPage: (page, pageSize = get().pageSize) => {
        set({ currentPage: page, pageSize })
      },

      filterProducts: (value, key) => {
        const allProducts = get().allProducts

        if (value === 'all') {
          set({ products: allProducts })
        } else {
          set({ products: allProducts.filter((item) => item[key] === value) })
        }
      },

      searchProducts: (value) => {
        const allProducts = get().allProducts
        set({
          products: allProducts.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase()),
          ),
        })
      },

      toggleFavorite: (product_id) => {
        set((state) => ({
          allProducts: state.allProducts.map((item) =>
            item.id === product_id
              ? { ...item, is_favorite: !item.is_favorite }
              : item,
          ),
          products: state.products.map((item) =>
            item.id === product_id
              ? { ...item, is_favorite: !item.is_favorite }
              : item,
          ),
        }))
      },
    }),
    {
      name: 'products-storage',
    },
  ),
)