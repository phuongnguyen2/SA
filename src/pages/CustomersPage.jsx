import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { Search, SlidersHorizontal, Users, Clock, Settings, Coins, Crown, Star, Sparkles, TimerOff, FlaskConical, CalendarX, Trash2 } from 'lucide-react'

const accountStatusMap = {
    trial: { label: 'Trial', className: 'account-status-trial', icon: FlaskConical },
    pro: { label: 'Pro', className: 'account-status-pro', icon: Crown },
    expire: { label: 'Expire', className: 'account-status-expire-trial', icon: TimerOff },
    delete: { label: 'Delete', className: 'account-status-delete', icon: Trash2 },
}

const mockCustomers = [
    { id: 1, org: 'Công ty Cổ phần PT Hub', sub: 'PT Hub', email: 'huhu13999@gmail.com', accountStatus: 'pro', members: 4, totalCredits: 1800, usedCredits: 320, createdAt: '27/02/2026, 03:38' },
    { id: 2, org: 'PTH', sub: 'PTH', email: 'yangmin@gmail.com', accountStatus: 'pro', members: 3, totalCredits: 3300, usedCredits: 580, createdAt: '25/02/2026, 03:25' },
    { id: 3, org: 'Meeting App Company', sub: 'MAC', email: 'mungnguyenvcu@gmail.com', accountStatus: 'trial', members: 1, totalCredits: 150, usedCredits: 45, createdAt: '24/02/2026, 09:01', trialExpiresAt: '26/03/2026' },
    { id: 4, org: 'Meeting App Company', sub: 'MAC', email: 'hcns@pthub.vn', accountStatus: 'pro', members: 1, totalCredits: 2500, usedCredits: 150, createdAt: '23/02/2026, 09:18' },
    { id: 5, org: 'Meeting App Company', sub: 'MAC', email: 'ct@pthub.vn', accountStatus: 'delete', members: 1, totalCredits: 0, usedCredits: 0, createdAt: '20/02/2026, 11:26' },
    { id: 6, org: 'Meeting App Company', sub: 'MAC', email: 'hoa@hoa.hoa', accountStatus: 'pro', members: 1, totalCredits: 1300, usedCredits: 200, createdAt: '12/02/2026, 11:12' },
    { id: 7, org: 'Meeting App Company', sub: 'MAC', email: 'hoa@hoa.hoang', accountStatus: 'expire', members: 1, totalCredits: 150, usedCredits: 150, createdAt: '12/02/2026, 18:45' },
    { id: 8, org: 'Meeting App Company', sub: 'MAC', email: 'hoa@test.test', accountStatus: 'trial', members: 1, totalCredits: 150, usedCredits: 0, createdAt: '12/02/2026, 16:40', trialExpiresAt: '14/03/2026' },
    { id: 9, org: 'Meeting App Company', sub: 'MAC', email: 'haha@gmail.com', accountStatus: 'pro', members: 1, totalCredits: 5000, usedCredits: 1200, createdAt: '12/02/2026, 16:40' },
    { id: 10, org: 'Meeting App Company', sub: 'MAC', email: 'dragon@gmail.com', accountStatus: 'delete', members: 1, totalCredits: 0, usedCredits: 0, createdAt: '12/02/2026, 16:36' },
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
                                <th style={{ width: '25%' }}>Tên tổ chức</th>
                                <th style={{ width: '20%' }}>Chủ sở hữu</th>
                                <th style={{ width: '15%' }}>Trạng thái</th>
                                <th style={{ width: '10%' }}>Nhân viên</th>
                                <th style={{ width: '14%' }}>Credit</th>
                                <th style={{ width: '10%' }}>Ngày tạo</th>
                                <th style={{ width: '6%', textAlign: 'center' }}>Hành động</th>
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
                                        {(() => {
                                            const info = accountStatusMap[customer.accountStatus] || accountStatusMap.trial
                                            const Icon = info.icon
                                            return (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                                                    <span className={`status-badge ${info.className}`}>
                                                        <Icon size={13} /> {info.label}
                                                    </span>
                                                    {customer.accountStatus === 'trial' && customer.trialExpiresAt && (
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                                                            <CalendarX size={12} /> Hết hạn: {customer.trialExpiresAt}
                                                        </span>
                                                    )}
                                                </div>
                                            )
                                        })()}
                                    </td>
                                    <td>
                                        <div className="cell-member">
                                            <Users size={16} />
                                            {customer.members}
                                        </div>
                                    </td>
                                    <td>
                                        {customer.accountStatus === 'expire' || customer.accountStatus === 'delete' ? (
                                            <div className="cell-credit cell-credit-depleted">
                                                <Coins size={14} />
                                                <span style={{ fontWeight: 600, color: 'var(--color-danger, #e74c3c)' }}>
                                                    {customer.accountStatus === 'delete' ? 'Đã xoá dữ liệu' : 'Hết credit'}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="cell-credit">
                                                <Coins size={14} />
                                                <span style={{ fontWeight: 600 }}>{customer.usedCredits.toLocaleString()}</span>
                                                <span style={{ color: 'var(--color-text-muted)' }}>/ {customer.totalCredits.toLocaleString()}</span>
                                            </div>
                                        )}
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
