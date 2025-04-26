import  { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import ViewProducts from './pages/ViewProducts'
import Categories from './pages/Categories'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="products" element={<ViewProducts />} />
        <Route path="categories" element={<Categories />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
 