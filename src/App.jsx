import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CustomersPage from './pages/CustomersPage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import ServicePacksPage from './pages/ServicePacksPage'
import ServicePackDetailPage from './pages/ServicePackDetailPage'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import OrderCreatePage from './pages/OrderCreatePage'
import AccountsPage from './pages/AccountsPage'

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/customers" replace />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
          <Route path="/service-packs" element={<ServicePacksPage />} />
          <Route path="/service-packs/:id" element={<ServicePackDetailPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/new" element={<OrderCreatePage />} />
          <Route path="/orders/:id" element={<OrderDetailPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
        </Routes>
      </div>
    </div>
  )
}
