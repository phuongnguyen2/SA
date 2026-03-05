import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { Search, SlidersHorizontal, Clock, Eye, ShoppingCart, DollarSign, CheckCircle, XCircle, Plus, X } from 'lucide-react'

const initialOrders = [
    { id: 'ORD-001', customer: 'Công ty Cổ phần PT Hub', email: 'huhu13999@gmail.com', pack: 'Professional', amount: '299.000 VND', status: 'completed', paymentMethod: 'Chuyển khoản', createdAt: '27/02/2026, 15:30' },
    { id: 'ORD-002', customer: 'PTH', email: 'yangmin@gmail.com', pack: 'Starter', amount: '99.000 VND', status: 'completed', paymentMethod: 'Thẻ tín dụng', createdAt: '25/02/2026, 10:15' },
    { id: 'ORD-003', customer: 'Meeting App Company', email: 'mungnguyenvcu@gmail.com', pack: 'Enterprise', amount: '999.000 VND', status: 'pending', paymentMethod: 'Chuyển khoản', createdAt: '24/02/2026, 14:22' },
    { id: 'ORD-004', customer: 'Công ty Cổ phần PT Hub', email: 'huhu13999@gmail.com', pack: 'Free Bonus', amount: '0 VND', status: 'completed', paymentMethod: 'Miễn phí', createdAt: '20/02/2026, 09:00' },
    { id: 'ORD-005', customer: 'Meeting App Company', email: 'ct@pthub.vn', pack: 'Professional', amount: '299.000 VND', status: 'cancelled', paymentMethod: 'Thẻ tín dụng', createdAt: '18/02/2026, 16:45' },
    { id: 'ORD-006', customer: 'Meeting App Company', email: 'hoa@hoa.hoa', pack: 'Starter', amount: '99.000 VND', status: 'completed', paymentMethod: 'Ví điện tử', createdAt: '15/02/2026, 11:30' },
    { id: 'ORD-007', customer: 'PTH', email: 'yangmin@gmail.com', pack: 'Enterprise', amount: '999.000 VND', status: 'pending', paymentMethod: 'Chuyển khoản', createdAt: '12/02/2026, 08:20' },
    { id: 'ORD-008', customer: 'Meeting App Company', email: 'hoa@test.test', pack: 'Starter', amount: '99.000 VND', status: 'completed', paymentMethod: 'Thẻ tín dụng', createdAt: '10/02/2026, 14:10' },
]

const statusMap = {
    completed: { label: 'Thành công', className: 'active' },
    pending: { label: 'Chờ xử lý', className: 'pending' },
    cancelled: { label: 'Đã huỷ', className: 'inactive' },
}

export default function OrdersPage() {
    const [orders, setOrders] = useState(initialOrders)
    const [search, setSearch] = useState('')
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)

    const filtered = orders.filter(o =>
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase())
    )

    const totalOrders = orders.length
    const completedOrders = orders.filter(o => o.status === 'completed').length
    const pendingOrders = orders.filter(o => o.status === 'pending').length
    const totalRevenue = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => {
            const num = parseInt(o.amount.replace(/[^0-9]/g, ''), 10)
            return sum + (isNaN(num) ? 0 : num)
        }, 0)

    const handleApprove = (id) => {
        const order = orders.find(o => o.id === id)
        if (order) {
            setSelectedOrder(order)
            setShowConfirmModal(true)
        }
    }

    const confirmPayment = () => {
        setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: 'completed' } : o))
        setShowConfirmModal(false)
        setSelectedOrder(null)
    }

    const handleReject = (id) => {
        if (window.confirm(`Từ chối thanh toán cho đơn hàng ${id}?`)) {
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' } : o))
        }
    }

    const formatCurrency = (val) => {
        return val.toLocaleString('vi-VN') + ' VND'
    }

    return (
        <>
            <Header />
            <div className="page-body fade-in">
                <div className="page-title-section">
                    <h1 className="page-title">Quản lý đơn hàng</h1>
                    <Link to="/orders/new" className="btn-primary" id="btn-create-order">
                        <Plus />
                        Tạọ đơn hàng
                    </Link>
                </div>

                {/* Stats */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-card-icon purple"><ShoppingCart size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{totalOrders}</span>
                            <span className="stat-card-label">Tổng đơn hàng</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-icon green"><CheckCircle size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{completedOrders}</span>
                            <span className="stat-card-label">Thành công</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-icon orange"><XCircle size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{pendingOrders}</span>
                            <span className="stat-card-label">Chờ xử lý</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-icon blue"><DollarSign size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{formatCurrency(totalRevenue)}</span>
                            <span className="stat-card-label">Tổng doanh thu</span>
                        </div>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <Search className="search-icon" />
                        <input
                            id="search-orders"
                            type="text"
                            placeholder="Tìm đơn hàng..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="filter-btn" id="btn-filter-orders">
                        <SlidersHorizontal />
                        Bộ lọc
                    </button>
                </div>

                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Gói dịch vụ</th>
                                <th>Số tiền</th>
                                <th>Thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(order => (
                                <tr key={order.id}>
                                    <td>
                                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{order.id}</span>
                                    </td>
                                    <td>
                                        <div className="cell-org">
                                            <span className="cell-org-name">{order.customer}</span>
                                            <span className="cell-org-sub" style={{ textTransform: 'none' }}>{order.email}</span>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{order.pack}</td>
                                    <td style={{ fontWeight: 600 }}>{order.amount}</td>
                                    <td className="cell-email">{order.paymentMethod}</td>
                                    <td>
                                        <span className={`status-badge ${statusMap[order.status].className}`}>
                                            {statusMap[order.status].label}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="cell-date">
                                            <Clock size={14} />
                                            {order.createdAt}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-btn-group">
                                            <Link to={`/orders/${order.id}`} className="action-btn" title="Xem chi tiết">
                                                <Eye size={18} />
                                            </Link>
                                            {order.paymentMethod === 'Chuyển khoản' && order.status === 'pending' && (
                                                <>
                                                    <button
                                                        className="action-btn approve"
                                                        title="Xác nhận thanh toán"
                                                        onClick={() => handleApprove(order.id)}
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        className="action-btn reject"
                                                        title="Từ chối thanh toán"
                                                        onClick={() => handleReject(order.id)}
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length > 0 && (
                        <div className="pagination">
                            <span className="pagination-info">Hiển thị 1-{filtered.length} / {filtered.length} đơn hàng</span>
                            <div className="pagination-buttons">
                                <button className="pagination-btn" disabled>←</button>
                                <button className="pagination-btn active">1</button>
                                <button className="pagination-btn" disabled>→</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showConfirmModal && selectedOrder && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Xác nhận thanh toán</h3>
                            <button className="modal-close" onClick={() => setShowConfirmModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <p style={{ marginBottom: '20px', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                                Bạn có chắc chắn muốn xác nhận thanh toán cho đơn hàng này không?
                            </p>
                            <div className="confirm-details">
                                <div className="confirm-item">
                                    <span className="confirm-label">Mã đơn hàng</span>
                                    <span className="confirm-value">{selectedOrder.id}</span>
                                </div>
                                <div className="confirm-item">
                                    <span className="confirm-label">Khách hàng</span>
                                    <span className="confirm-value" style={{ maxWidth: '200px' }}>{selectedOrder.customer}</span>
                                </div>
                                <div className="confirm-item">
                                    <span className="confirm-label">Gói dịch vụ</span>
                                    <span className="confirm-value">{selectedOrder.pack}</span>
                                </div>
                                <div className="confirm-item">
                                    <span className="confirm-label">Số tiền</span>
                                    <span className="confirm-value highlight">{selectedOrder.amount}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowConfirmModal(false)}>
                                Huỷ bỏ
                            </button>
                            <button className="btn-primary" onClick={confirmPayment}>
                                Xác nhận ngay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
