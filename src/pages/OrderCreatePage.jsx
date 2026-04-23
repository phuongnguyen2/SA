import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import {
    ChevronLeft,
    User,
    FileText,
    Calendar,
    CreditCard,
    Tag,
    Clock,
    Save,
    Plus,
    Trash2,
    Building2,
    Mail,
    Hash,
    Coins
} from 'lucide-react'
import './OrderCreatePage.css'

const mockCustomers = [
    { id: 1, org: 'Công ty Cổ phần PT Hub', sub: 'PT Hub', email: 'huhu13999@gmail.com', taxId: '0123456789', address: 'Số 1, đường ABC, Quận X, TP. HCM' },
    { id: 2, org: 'PTH', sub: 'PTH', email: 'yangmin@gmail.com', taxId: '9876543210', address: '123 Đường Láng, Đống Đa, Hà Nội' },
    { id: 3, org: 'Meeting App Company', sub: 'MAC', email: 'mungnguyenvcu@gmail.com', taxId: '1122334455', address: '456 Lê Lợi, Quận 1, TP. HCM' },
]

const mockPacks = [
    { id: 1, name: 'Free', price: 0, credits: 300 },
    { id: 2, name: 'Free Bonus', price: 0, credits: 500 },
    { id: 3, name: 'Starter', price: 99000, credits: 1300 },
    { id: 4, name: 'Professional', price: 299000, credits: 3000 },
    { id: 5, name: 'Enterprise', price: 999000, credits: 10000 },
]

const statusOptions = [
    { id: 'nhap', label: 'Nháp', icon: <Clock size={16} /> },
    { id: 'baogia', label: 'Báo giá', icon: <FileText size={16} /> },
    { id: 'xacnhan', label: 'Xác nhận thanh toán', icon: <CreditCard size={16} /> },
]



export default function OrderCreatePage() {
    const navigate = useNavigate()
    const [order, setOrder] = useState({
        customerId: '',
        customerName: '',
        billingAddress: '',
        taxId: '',
        billingEmail: '',
        orderDate: new Date().toISOString().split('T')[0],
        specialist: 'Nguyễn Văn A',
        status: 'nhap',
        discount: 0,
        items: [
            {
                id: Date.now(),
                serviceName: '',
                quantity: 1,
                price: 0,
                credits: 0,
                currency: 'VND',
                discountAmount: 0,
                discountPercent: 0,
                tax: 10
            }
        ]
    })

    const handleCustomerChange = (e) => {
        const selectedId = e.target.value
        if (selectedId === 'custom') {
            setOrder({
                ...order,
                customerId: 'custom',
                customerName: '',
                billingAddress: '',
                taxId: '',
                billingEmail: ''
            })
            return
        }

        const customer = mockCustomers.find(c => c.id.toString() === selectedId)
        if (customer) {
            setOrder({
                ...order,
                customerId: selectedId,
                customerName: customer.org,
                billingAddress: customer.address,
                taxId: customer.taxId,
                billingEmail: customer.email
            })
        }
    }

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
        return (val || 0).toLocaleString('vi-VN') + ' VND'
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
                    tax: 10
                }
            ]
        })
    }

    const handleRemoveItem = (id) => {
        if (order.items.length > 1) {
            setOrder({
                ...order,
                items: order.items.filter(item => item.id !== id)
            })
        }
    }

    const updateItem = (id, field, value) => {
        setOrder({
            ...order,
            items: order.items.map(item => {
                if (item.id === id) {
                    const newItem = { ...item, [field]: value }

                    // Auto-fill price if service name changes
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

    const handleSave = () => {
        alert('Đơn hàng đã được tạo thành công!')
        navigate('/orders')
    }

    return (
        <>
            <Header />
            <div className="page-body fade-in">
                <div className="order-create-container">
                    <Link to="/orders" className="back-link mb-20">
                        <ChevronLeft size={18} />
                        Quay lại danh sách đơn hàng
                    </Link>

                    <div className="order-create-header">
                        <div className="order-header-left" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
                                <Plus size={24} />
                            </div>
                            <div className="order-header-info">
                                <h1>Tạo mới đơn hàng</h1>
                                <p className="text-muted" style={{ margin: 0 }}>Nhập thông tin chi tiết để tạo đơn hàng mới</p>
                            </div>
                        </div>
                    </div>

                    <div className="order-main-layout">
                        {/* LEFT COLUMN: Main Details & Items */}
                        <div className="order-left-col">
                            <div className="order-card">
                                <h3 className="card-title"><User size={20} /> Thông tin Khách hàng & Đơn hàng</h3>
                                <div className="compact-form-grid">
                                    <div className="form-item span-2">
                                        <label className="info-label">Chọn khách hàng</label>
                                        <select
                                            className="edit-select create-status-select"
                                            value={order.customerId}
                                            onChange={handleCustomerChange}
                                        >
                                            <option value="">-- Chọn khách hàng sẵn có --</option>
                                            {mockCustomers.map(c => (
                                                <option key={c.id} value={c.id}>{c.org}</option>
                                            ))}
                                            <option value="custom">Nhập mới khách hàng...</option>
                                        </select>
                                    </div>
                                    <div className="form-item">
                                        <label className="info-label">Ngày đặt hàng</label>
                                        <input
                                            type="date"
                                            className="edit-input"
                                            value={order.orderDate}
                                            onChange={(e) => setOrder({ ...order, orderDate: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-item span-2">
                                        <label className="info-label">Tên khách hàng / Công ty</label>
                                        <div className="input-with-icon">
                                            <Building2 size={16} />
                                            <input
                                                type="text"
                                                className="edit-input icon-padding"
                                                placeholder="Tên công ty..."
                                                value={order.customerName}
                                                onChange={(e) => setOrder({ ...order, customerName: e.target.value, customerId: 'custom' })}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item">
                                        <label className="info-label">Mã số thuế</label>
                                        <div className="input-with-icon">
                                            <Hash size={16} />
                                            <input
                                                type="text"
                                                className="edit-input icon-padding"
                                                placeholder="MST..."
                                                value={order.taxId}
                                                onChange={(e) => setOrder({ ...order, taxId: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-item span-2">
                                        <label className="info-label">Địa chỉ xuất hoá đơn</label>
                                        <input
                                            type="text"
                                            className="edit-input"
                                            placeholder="Địa chỉ chi tiết..."
                                            value={order.billingAddress}
                                            onChange={(e) => setOrder({ ...order, billingAddress: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-item">
                                        <label className="info-label">Email nhận hoá đơn</label>
                                        <div className="input-with-icon">
                                            <Mail size={16} />
                                            <input
                                                type="email"
                                                className="edit-input icon-padding"
                                                placeholder="Email..."
                                                value={order.billingEmail}
                                                onChange={(e) => setOrder({ ...order, billingEmail: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-card">
                                <h3 className="card-title"><Tag size={20} /> Chi tiết dịch vụ</h3>
                                <div style={{ overflowX: 'auto' }}>
                                    <table className="items-create-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '22%' }}>Gói dịch vụ</th>
                                                <th style={{ width: '8%', textAlign: 'center' }}>SL</th>
                                                <th style={{ width: '12%' }}>Đơn giá</th>
                                                <th style={{ width: '10%' }}>Giảm (%)</th>
                                                <th style={{ width: '10%' }}>Thuế (%)</th>
                                                <th style={{ width: '15%', textAlign: 'right' }}>Thành tiền</th>
                                                <th style={{ width: '5%' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.items.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <select
                                                            className="table-select"
                                                            value={item.serviceName}
                                                            onChange={(e) => updateItem(item.id, 'serviceName', e.target.value)}
                                                        >
                                                            <option value="">- Chọn -</option>
                                                            {mockPacks.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="table-input text-center"
                                                            value={item.quantity}
                                                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="table-input text-center"
                                                            value={item.price}
                                                            onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="table-input text-center"
                                                            value={item.discountPercent}
                                                            onChange={(e) => updateItem(item.id, 'discountPercent', parseInt(e.target.value) || 0)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            className="table-input text-center"
                                                            value={item.tax}
                                                            onChange={(e) => updateItem(item.id, 'tax', parseInt(e.target.value) || 0)}
                                                        />
                                                    </td>
                                                    <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--color-primary)' }}>
                                                        {formatCurrency(calculateItemTotal(item))}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="remove-item-btn"
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            disabled={order.items.length === 1}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button className="add-item-btn" onClick={handleAddItem}>
                                    <Plus size={16} /> Thêm dịch vụ
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Summary & Actions pane */}
                        <div className="order-right-col">
                            <div className="order-card" style={{ padding: '24px' }}>
                                <h3 className="card-title" style={{ marginTop: 0, paddingTop: 0 }}>Tổng kết thanh toán</h3>
                                <div className="summary-container">
                                    <div className="summary-row">
                                        <span className="summary-label">Tổng chi tiết</span>
                                        <span className="summary-value" style={{ fontWeight: 600 }}>{formatCurrency(totalBeforeGlobalDiscount)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="summary-label" style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Giảm giá thêm (VND)</span>
                                        <input
                                            type="number"
                                            className="summary-input"
                                            value={order.discount}
                                            onChange={(e) => setOrder({ ...order, discount: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="summary-row total">
                                        <span className="summary-label">Tổng thanh toán</span>
                                        <span className="summary-value">{formatCurrency(finalAmount)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="order-card" style={{ padding: '24px' }}>
                                <div className="form-item" style={{ marginBottom: 16 }}>
                                    <label className="info-label">Chuyên viên phụ trách</label>
                                    <input
                                        type="text"
                                        className="edit-input"
                                        value={order.specialist}
                                        onChange={(e) => setOrder({ ...order, specialist: e.target.value })}
                                    />
                                </div>
                                <div className="form-item" style={{ marginBottom: 24 }}>
                                    <label className="info-label">Trạng thái đơn hàng</label>
                                    <select
                                        className="edit-select create-status-select"
                                        value={order.status}
                                        onChange={(e) => setOrder({ ...order, status: e.target.value })}
                                        style={{ backgroundColor: 'var(--color-bg)' }}
                                    >
                                        {statusOptions.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="action-buttons-grid">
                                    <button className="save-btn" onClick={handleSave}>
                                        <Save size={18} /> Lưu đơn hàng
                                    </button>
                                    <button className="cancel-btn" onClick={() => navigate('/orders')}>
                                        Huỷ bỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
