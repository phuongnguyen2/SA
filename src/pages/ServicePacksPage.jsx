import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { Search, SlidersHorizontal, Clock, Settings, Package, Users, CreditCard, TrendingUp, Plus } from 'lucide-react'

const mockPacks = [
    { id: 1, name: 'Free', code: 'FREE', price: '0 VND', maxUsers: 5, status: 'active', subscribers: 42, priority: 3, createdAt: '01/01/2026, 00:00' },
    { id: 2, name: 'Free Bonus', code: 'FREE_BONUS', price: '0 VND', maxUsers: 10, status: 'active', subscribers: 8, priority: 3, createdAt: '01/01/2026, 00:00' },
    { id: 3, name: 'Starter', code: 'STARTER', price: '99.000 VND', maxUsers: 20, status: 'active', subscribers: 15, priority: 1, createdAt: '15/01/2026, 10:30' },
    { id: 4, name: 'Professional', code: 'PRO', price: '299.000 VND', maxUsers: 50, status: 'active', subscribers: 7, priority: 1, createdAt: '15/01/2026, 10:30' },
    { id: 5, name: 'Enterprise', code: 'ENT', price: '999.000 VND', maxUsers: 200, status: 'active', subscribers: 3, priority: 1, createdAt: '15/01/2026, 10:30' },
    { id: 6, name: 'Trial 30 Days', code: 'TRIAL30', price: '0 VND', maxUsers: 50, status: 'inactive', subscribers: 0, priority: 3, createdAt: '20/01/2026, 08:00' },
]

export default function ServicePacksPage() {
    const [search, setSearch] = useState('')

    const filtered = mockPacks.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase())
    )

    const totalPacks = mockPacks.length
    const activePacks = mockPacks.filter(p => p.status === 'active').length
    const totalSubscribers = mockPacks.reduce((sum, p) => sum + p.subscribers, 0)
    const paidPacks = mockPacks.filter(p => p.price !== '0 VND').length

    return (
        <>
            <Header />
            <div className="page-body fade-in">
                <div className="page-title-section">
                    <h1 className="page-title">Quản lý gói dịch vụ</h1>
                    <Link to="/service-packs/new" className="btn-primary" id="btn-add-service-pack">
                        <Plus />
                        Thêm gói mới
                    </Link>
                </div>

                {/* Stats */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-card-icon purple"><Package size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{totalPacks}</span>
                            <span className="stat-card-label">Tổng gói dịch vụ</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-icon green"><TrendingUp size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{activePacks}</span>
                            <span className="stat-card-label">Đang hoạt động</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-icon blue"><Users size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{totalSubscribers}</span>
                            <span className="stat-card-label">Tổng người dùng</span>
                        </div>
                    </div>

                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <Search className="search-icon" />
                        <input
                            id="search-service-packs"
                            type="text"
                            placeholder="Tìm gói dịch vụ..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="filter-btn" id="btn-filter-packs">
                        <SlidersHorizontal />
                        Bộ lọc
                    </button>
                </div>

                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Tên gói</th>
                                <th>Mã gói</th>
                                <th>Giá</th>
                                <th style={{ textAlign: 'center' }}>Ưu tiên</th>
                                <th>Số người dùng tối đa</th>
                                <th>Trạng thái</th>
                                <th>Đăng ký</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(pack => (
                                <tr key={pack.id}>
                                    <td>
                                        <Link to={`/service-packs/${pack.id}`} style={{ fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}>{pack.name}</Link>
                                    </td>
                                    <td>
                                        <span className="cell-org-sub" style={{ fontSize: '0.857rem' }}>{pack.code}</span>
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{pack.price}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span style={{
                                            padding: '2px 8px',
                                            background: 'var(--color-bg-secondary)',
                                            borderRadius: '4px',
                                            fontWeight: 600,
                                            color: pack.priority === 1 ? 'var(--color-primary)' : 'inherit'
                                        }}>
                                            {pack.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="cell-member">
                                            <Users size={16} />
                                            {pack.maxUsers}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${pack.status}`}>
                                            {pack.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 500 }}>{pack.subscribers}</td>
                                    <td>
                                        <div className="cell-date">
                                            <Clock size={14} />
                                            {pack.createdAt}
                                        </div>
                                    </td>
                                    <td>
                                        <Link to={`/service-packs/${pack.id}`} className="action-btn" title="Cài đặt">
                                            <Settings size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length > 0 && (
                        <div className="pagination">
                            <span className="pagination-info">Hiển thị 1-{filtered.length} / {filtered.length} gói dịch vụ</span>
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
