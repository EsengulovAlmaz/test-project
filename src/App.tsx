import { Navigate, Route, Routes } from 'react-router-dom'

import CreateProduct from './pages/CreateProduct/CreateProduct'
import ProductsPage from './pages/Products/Products'
import ViewProduct from './pages/ViewProduct/ViewProduct'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />

      <Route path="/products" element={<ProductsPage />} />

      <Route path="/products/:id" element={<ViewProduct />} />

      <Route path="/create-product" element={<CreateProduct />} />
    </Routes>
  )
}

export default App
