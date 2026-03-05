import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Search, SlidersHorizontal, Users, Clock, Settings } from 'lucide-react'

const mockCustomers = [
    { id: 1, org: 'Công ty Cổ phần PT Hub', sub: 'PT Hub', email: 'huhu13999@gmail.com', status: 'active', members: 4, plans: ['free_bonus', 'starter'], createdAt: '27/02/2026, 03:38' },
    { id: 2, org: 'PTH', sub: 'PTH', email: 'yangmin@gmail.com', status: 'active', members: 3, plans: ['free', 'professional'], createdAt: '25/02/2026, 03:25' },
    { id: 3, org: 'Meeting App Company', sub: 'MAC', email: 'mungnguyenvcu@gmail.com', status: 'active', members: 1, plans: ['free'], createdAt: '24/02/2026, 09:01' },
    { id: 4, org: 'Meeting App Company', sub: 'MAC', email: 'hcns@pthub.vn', status: 'active', members: 1, plans: ['free', 'starter', 'enterprise'], createdAt: '23/02/2026, 09:18' },
    { id: 5, org: 'Meeting App Company', sub: 'MAC', email: 'ct@pthub.vn', status: 'active', members: 1, plans: ['free'], createdAt: '20/02/2026, 11:26' },
    { id: 6, org: 'Meeting App Company', sub: 'MAC', email: 'hoa@hoa.hoa', status: 'active', members: 1, plans: ['free', 'starter'], createdAt: '12/02/2026, 11:12' },
    { id: 7, org: 'Meeting App Company', sub: 'MAC', email: 'hoa@hoa.hoang', status: 'active', members: 1, plans: ['free'], createdAt: '12/02/2026, 18:45' },
    { id: 8, org: 'Meeting App Company', sub: 'MAC', email: 'hoa@test.test', status: 'active', members: 1, plans: ['free'], createdAt: '12/02/2026, 16:40' },
    { id: 9, org: 'Meeting App Company', sub: 'MAC', email: 'haha@gmail.com', status: 'active', members: 1, plans: ['professional', 'enterprise'], createdAt: '12/02/2026, 16:40' },
    { id: 10, org: 'Meeting App Company', sub: 'MAC', email: 'dragon@gmail.com', status: 'active', members: 1, plans: ['free'], createdAt: '12/02/2026, 16:36' },
]

export default function CustomersPage() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const filtered = mockCustomers.filter(c =>
        c.org.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            <Header />
            <div className="page-body fade-in">
                <div className="page-title-section">
                    <h1 className="page-title">Quản lý khách hàng</h1>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <Search className="search-icon" />
                        <input
                            id="search-customers"
                            type="text"
                            placeholder="Tìm khách hàng..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="filter-btn" id="btn-filter-customers">
                        <SlidersHorizontal />
                        Bộ lọc
                    </button>
                </div>

                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Tên tổ chức</th>
                                <th>Chủ sở hữu</th>
                                <th>Trạng thái</th>
                                <th>Nhân viên</th>
                                <th>Gói dịch vụ</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(customer => (
                                <tr key={customer.id} onClick={() => navigate(`/customers/${customer.id}`)} style={{ cursor: 'pointer' }}>
                                    <td>
                                        <div className="cell-org">
                                            <span className="cell-org-name">{customer.org}</span>
                                            <span className="cell-org-sub">{customer.sub}</span>
                                        </div>
                                    </td>
                                    <td className="cell-email">{customer.email}</td>
                                    <td>
                                        <span className={`status-badge ${customer.status}`}>
                                            {customer.status === 'active' ? 'Hoạt động' : customer.status === 'inactive' ? 'Ngừng' : 'Chờ duyệt'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="cell-member">
                                            <Users size={16} />
                                            {customer.members}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="plan-tags">
                                            {customer.plans.map(plan => (
                                                <span key={plan} className="plan-tag">{plan}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cell-date">
                                            <Clock size={14} />
                                            {customer.createdAt}
                                        </div>
                                    </td>
                                    <td>
                                        <button className="action-btn" title="Cài đặt">
                                            <Settings size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length > 0 && (
                        <div className="pagination">
                            <span className="pagination-info">Hiển thị 1-{filtered.length} / {filtered.length} khách hàng</span>
                            <div className="pagination-buttons">
                                <button className="pagination-btn" disabled>←</button>
                                <button className="pagination-btn active">1</button>
                                <button className="pagination-btn" disabled>→</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
