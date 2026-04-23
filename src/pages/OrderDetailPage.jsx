import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import {
    ChevronLeft,
    User,
    FileText,
    Calendar,
    CreditCard,
    Headphones,
    Tag,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    FileSearch,
    Save,
    Trash2,
    Plus,
    Coins
} from 'lucide-react'
import './OrderDetailPage.css'

const statusOptions = [
    { id: 'nhap', label: 'Nháp', className: 'status-nhap', icon: <Clock size={16} /> },
    { id: 'baogia', label: 'Báo giá', className: 'status-baogia', icon: <FileSearch size={16} /> },
    { id: 'xacnhan', label: 'Xác nhận thanh toán', className: 'status-xacnhan', icon: <CreditCard size={16} /> },
    { id: 'thanhcong', label: 'Thanh toán thành công', className: 'status-thanhcong', icon: <CheckCircle size={16} /> },
    { id: 'loi', label: 'Thanh toán lỗi', className: 'status-loi', icon: <AlertCircle size={16} /> },
    { id: 'huy', label: 'Huỷ', className: 'status-huy', icon: <XCircle size={16} /> },
]

const mockPacks = [
    { id: 1, name: 'Free', price: 0, credits: 300 },
    { id: 2, name: 'Free Bonus', price: 0, credits: 500 },
    { id: 3, name: 'Starter', price: 99000, credits: 1300 },
    { id: 4, name: 'Professional', price: 299000, credits: 3000 },
    { id: 5, name: 'Enterprise', price: 999000, credits: 10000 },
    { id: 6, name: 'Gói Professional (1 năm)', price: 299000, credits: 3000 },
    { id: 7, name: 'Dịch vụ Setup AI Bot', price: 100000, credits: 500 },
    { id: 8, name: 'Gói Starter (6 tháng)', price: 99000, credits: 1300 },
    { id: 9, name: 'Dung lượng lưu trữ +10GB', price: 50000, credits: 200 },
]



const initialOrder = {
    id: 'ORD-001',
    customer: 'Công ty Cổ phần PT Hub',
    billingInfo: 'Số 1, đường ABC, Quận X, TP. HCM. MST: 0123456789',
    orderDate: '2026-03-04T09:30:00',
    paymentDate: '2026-03-04T10:15:00',
    specialist: 'Nguyễn Văn A',
    status: 'xacnhan',
    discount: 50000,
    items: [
        { id: 1, serviceName: 'Gói Professional (1 năm)', quantity: 1, price: 299000, credits: 3000, currency: 'VND', discountAmount: 0, discountPercent: 0, tax: 10 },
        { id: 2, serviceName: 'Dịch vụ Setup AI Bot', quantity: 1, price: 100000, credits: 500, currency: 'VND', discountAmount: 10000, discountPercent: 10, tax: 8 },
        { id: 3, serviceName: 'Gói Starter (6 tháng)', quantity: 1, price: 99000, credits: 1300, currency: 'VND', discountAmount: 0, discountPercent: 0, tax: 10 },
        { id: 4, serviceName: 'Dung lượng lưu trữ +10GB', quantity: 2, price: 50000, credits: 200, currency: 'VND', discountAmount: 5000, discountPercent: 5, tax: 8 },
    ]
}

export default function OrderDetailPage() {
    const { id } = useParams()
    const [order, setOrder] = useState(initialOrder)
    const [isSaved, setIsSaved] = useState(false)

    const calculateItemTotal = (item) => {
        const subtotal = (item.quantity * item.price) - (item.discountAmount || 0)
        const withTax = subtotal * (1 + (item.tax || 0) / 100)
        return withTax
    }

    const totalBeforeGlobalDiscount = useMemo(() =>
        order.items.reduce((sum, item) => sum + calculateItemTotal(item), 0),
        [order.items])

    const finalAmount = totalBeforeGlobalDiscount - (order.discount || 0)

    const formatCurrency = (val) => {
        return val.toLocaleString('vi-VN') + ' VND'
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return '---'
        const date = new Date(dateStr)
        return date.toLocaleString('vi-VN')
    }

    const handleSave = () => {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    const handleAddItem = () => {
        setOrder({
            ...order,
            items: [
                ...order.items,
                {
                    id: Date.now(),
                    serviceName: '',
                    quantity: 1,
                    price: 0,
                    credits: 0,
                    currency: 'VND',
                    discountAmount: 0,
                    discountPercent: 0,
                    tax: 10,
                    isNew: true
                }
            ]
        })
    }

    const handleRemoveItem = (itemId) => {
        if (order.items.length > 1) {
            setOrder({
                ...order,
                items: order.items.filter(item => item.id !== itemId)
            })
        }
    }

    const updateItem = (itemId, field, value) => {
        setOrder({
            ...order,
            items: order.items.map(item => {
                if (item.id === itemId) {
                    const newItem = { ...item, [field]: value }

                    // Auto-fill price, type, and category if service name changes
                    if (field === 'serviceName') {
                        const pack = mockPacks.find(p => p.name === value)
                        if (pack) {
                            newItem.price = pack.price
                            newItem.credits = pack.credits
                        }
                    }

                    if (field === 'price' || field === 'quantity' || field === 'serviceName') {
                        newItem.discountAmount = (newItem.price * newItem.quantity * newItem.discountPercent) / 100
                    } else if (field === 'discountAmount') {
                        const basePrice = newItem.price * newItem.quantity
                        newItem.discountPercent = basePrice > 0 ? (value / basePrice) * 100 : 0
                    } else if (field === 'discountPercent') {
                        newItem.discountAmount = (newItem.price * newItem.quantity * value) / 100
                    }
                    return newItem
                }
                return item
            })
        })
    }

    const currentStatus = statusOptions.find(s => s.id === order.status) || statusOptions[0]
    const isDetailEditable = order.status === 'huy'

    return (
        <>
            <Header />
            <div className="page-body fade-in">
                <div className="order-detail-container">
                    <Link to="/orders" className="back-link mb-20">
                        <ChevronLeft size={18} />
                        Quay lại danh sách đơn hàng
                    </Link>

                    <div className="order-detail-header">
                        <div className="order-header-left">
                            <div className="order-icon-wrapper">
                                <FileText size={32} />
                            </div>
                            <div className="order-header-info">
                                <h1>Chi tiết đơn hàng {id || order.id}</h1>
                                <div className="order-header-meta">
                                    <span className={`order-status-badge ${currentStatus.className}`}>
                                        {currentStatus.label}
                                    </span>
                                    <span className="detail-meta-divider">•</span>
                                    <span>Tạo bởi: {order.specialist}</span>
                                </div>
                            </div>
                        </div>
                        <div className="action-btn-group">
                            <button className={`save-btn ${isSaved ? 'saved' : ''}`} onClick={handleSave}>
                                <Save size={18} />
                                {isSaved ? 'Đã lưu' : 'Lưu thay đổi'}
                            </button>
                        </div>
                    </div>

                    <div className="section-grid">
                        <div className="order-card">
                            <h3 className="card-title"><User size={20} /> Khách hàng & Hoá đơn</h3>
                            <div className="info-grid">
                                <div className="info-item" style={{ gridColumn: 'span 2' }}>
                                    <span className="info-label">Khách hàng</span>
                                    <span className="info-value">{order.customer}</span>
                                </div>
                                <div className="info-item" style={{ gridColumn: 'span 2' }}>
                                    <span className="info-label">Thông tin xuất hoá đơn</span>
                                    <span className="info-value">{order.billingInfo}</span>
                                </div>
                            </div>
                        </div>

                        <div className="order-card">
                            <h3 className="card-title"><Calendar size={20} /> Thông tin chung</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Ngày đặt hàng</span>
                                    <span className="info-value">{formatDate(order.orderDate)}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Ngày thanh toán</span>
                                    <span className="info-value">{formatDate(order.paymentDate)}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Chuyên viên CSKH</span>
                                    <span className="info-value">{order.specialist}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Trạng thái</span>
                                    <select
                                        className="edit-select status-select"
                                        value={order.status}
                                        onChange={(e) => setOrder({ ...order, status: e.target.value })}
                                        style={{
                                            background: `var(--color-${order.status === 'thanhcong' ? 'success' : order.status === 'loi' ? 'danger' : 'primary'})`,
                                            color: 'white'
                                        }}
                                    >
                                        {statusOptions.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="items-table-section">
                        <h3 className="card-title"><Tag size={20} /> Chi tiết đơn hàng</h3>
                        <div className="table-responsive">
                            <table className="items-table editable-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }}>Tên dịch vụ</th>

                                        <th style={{ width: '6%' }}>SL</th>
                                        <th style={{ width: '8%' }}>Credit</th>
                                        <th style={{ width: '10%' }}>Đơn giá</th>
                                        <th style={{ width: '10%' }}>Giảm (%)</th>
                                        <th style={{ width: '8%' }}>Thuế (%)</th>
                                        <th style={{ width: '10%', textAlign: 'right' }}>Thành tiền</th>
                                        {isDetailEditable && <th style={{ width: '40px' }}></th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                {item.isNew && isDetailEditable ? (
                                                    <select
                                                        className="table-select"
                                                        value={item.serviceName}
                                                        onChange={(e) => updateItem(item.id, 'serviceName', e.target.value)}
                                                    >
                                                        <option value="">-- Chọn gói --</option>
                                                        {mockPacks.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                                                    </select>
                                                ) : (
                                                    <div className="item-name-static">{item.serviceName}</div>
                                                )}
                                            </td>

                                            <td>
                                                <input
                                                    type="number"
                                                    className="table-input text-center"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                    readOnly={!isDetailEditable}
                                                />
                                            </td>
                                            <td>
                                                <div className="cell-credit">
                                                    <Coins size={14} />
                                                    <span style={{ fontWeight: 600 }}>{(item.credits || 0).toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="table-input"
                                                    value={item.price}
                                                    onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                                                    readOnly={!isDetailEditable}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="table-input"
                                                    value={item.discountPercent}
                                                    onChange={(e) => updateItem(item.id, 'discountPercent', parseInt(e.target.value) || 0)}
                                                    readOnly={!isDetailEditable}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="table-input"
                                                    value={item.tax}
                                                    onChange={(e) => updateItem(item.id, 'tax', parseInt(e.target.value) || 0)}
                                                    readOnly={!isDetailEditable}
                                                />
                                            </td>
                                            <td style={{ textAlign: 'right', fontWeight: 700 }}>
                                                {formatCurrency(calculateItemTotal(item))}
                                            </td>
                                            {isDetailEditable && (
                                                <td>
                                                    <button
                                                        className="remove-item-btn"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        disabled={order.items.length === 1}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {isDetailEditable && (
                            <div className="table-footer-actions">
                                <button className="add-item-btn" onClick={handleAddItem}>
                                    <Plus size={16} /> Thêm dịch vụ
                                </button>
                            </div>
                        )}

                        <div className="summary-section">
                            <div className="summary-card">
                                <div className="summary-row">
                                    <span className="summary-label">Tổng tiền chi tiết</span>
                                    <span className="summary-value">{formatCurrency(totalBeforeGlobalDiscount)}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="summary-label">Giảm giá thêm (VND)</span>
                                    <input
                                        type="number"
                                        className="summary-input"
                                        value={order.discount}
                                        onChange={(e) => setOrder({ ...order, discount: parseInt(e.target.value) || 0 })}
                                        readOnly={!isDetailEditable}
                                    />
                                </div>
                                <div className="summary-row total">
                                    <span className="summary-label">Tổng thanh toán</span>
                                    <span className="summary-value">{formatCurrency(finalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
