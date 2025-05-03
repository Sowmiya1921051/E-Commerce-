import  { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import ViewProducts from './pages/ViewProducts'
import Categories from './pages/Categories'
import Images from './pages/Images' 
import ProductList from './pages/ProductList'
import EditProduct from './pages/EditProduct'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="products" element={<ViewProducts />} />
        <Route path="categories" element={<Categories />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="images" element={<Images />} /> {/* New Images Route */}
        <Route path="product-list" element={<ProductList />} /> {/* New Product List Route */}
      </Route>
    </Routes>
  )
}

export default App
 