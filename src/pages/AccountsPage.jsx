import { useState } from 'react'
import Header from '../components/Header'
import { Search, SlidersHorizontal, Clock, Settings, UserCog, Shield, UserCheck, UserX } from 'lucide-react'

const mockAccounts = [
    { id: 1, name: 'Nguyễn Văn Admin', email: 'admin@vai-o.vn', role: 'Super Admin', status: 'active', lastLogin: '03/03/2026, 08:30', createdAt: '01/01/2026, 00:00' },
    { id: 2, name: 'Trần Thị Hoa', email: 'hoa@pthub.vn', role: 'Admin', status: 'active', lastLogin: '02/03/2026, 17:45', createdAt: '05/01/2026, 09:15' },
    { id: 3, name: 'Lê Minh Tuấn', email: 'tuan@vai-o.vn', role: 'Editor', status: 'active', lastLogin: '01/03/2026, 10:20', createdAt: '10/01/2026, 14:30' },
    { id: 4, name: 'Phạm Thị Mai', email: 'mai@vai-o.vn', role: 'Viewer', status: 'inactive', lastLogin: '15/02/2026, 09:00', createdAt: '15/01/2026, 16:00' },
    { id: 5, name: 'Ngô Thanh Hùng', email: 'hung@pthub.vn', role: 'Admin', status: 'active', lastLogin: '03/03/2026, 07:50', createdAt: '20/01/2026, 11:45' },
    { id: 6, name: 'Vũ Hoàng Nam', email: 'nam@vai-o.vn', role: 'Editor', status: 'active', lastLogin: '28/02/2026, 14:30', createdAt: '01/02/2026, 08:20' },
    { id: 7, name: 'Đặng Thị Lan', email: 'lan@vai-o.vn', role: 'Viewer', status: 'inactive', lastLogin: '10/02/2026, 11:00', createdAt: '05/02/2026, 10:10' },
]

const roleColors = {
    'Super Admin': { bg: '#F0EEFF', color: '#6C5CE7' },
    'Admin': { bg: '#E6F9F3', color: '#00B894' },
    'Editor': { bg: '#EBF5FF', color: '#0984E3' },
    'Viewer': { bg: '#FFF8E7', color: '#E67E22' },
}

export default function AccountsPage() {
    const [search, setSearch] = useState('')

    const filtered = mockAccounts.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        a.role.toLowerCase().includes(search.toLowerCase())
    )

    const totalAccounts = mockAccounts.length
    const activeAccounts = mockAccounts.filter(a => a.status === 'active').length
    const adminCount = mockAccounts.filter(a => a.role === 'Super Admin' || a.role === 'Admin').length
    const inactiveCount = mockAccounts.filter(a => a.status === 'inactive').length

    return (
        <>
            <Header />
            <div className="page-body fade-in">
                <div className="page-title-section">
                    <h1 className="page-title">Quản lý tài khoản</h1>
                </div>

                {/* Stats */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-card-icon purple"><UserCog size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{totalAccounts}</span>
                            <span className="stat-card-label">Tổng tài khoản</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-icon green"><UserCheck size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{activeAccounts}</span>
                            <span className="stat-card-label">Đang hoạt động</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-icon blue"><Shield size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{adminCount}</span>
                            <span className="stat-card-label">Quản trị viên</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-card-icon orange"><UserX size={22} /></div>
                        <div className="stat-card-content">
                            <span className="stat-card-value">{inactiveCount}</span>
                            <span className="stat-card-label">Không hoạt động</span>
                        </div>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <Search className="search-icon" />
                        <input
                            id="search-accounts"
                            type="text"
                            placeholder="Tìm tài khoản..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="filter-btn" id="btn-filter-accounts">
                        <SlidersHorizontal />
                        Bộ lọc
                    </button>
                </div>

                <div className="data-table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Vai trò</th>
                                <th>Trạng thái</th>
                                <th>Đăng nhập cuối</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(account => (
                                <tr key={account.id}>
                                    <td>
                                        <span style={{ fontWeight: 600 }}>{account.name}</span>
                                    </td>
                                    <td className="cell-email">{account.email}</td>
                                    <td>
                                        <span
                                            className="status-badge"
                                            style={{
                                                background: roleColors[account.role]?.bg,
                                                color: roleColors[account.role]?.color,
                                            }}
                                        >
                                            {account.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${account.status}`}>
                                            {account.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="cell-date">
                                            <Clock size={14} />
                                            {account.lastLogin}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cell-date">
                                            <Clock size={14} />
                                            {account.createdAt}
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
                            <span className="pagination-info">Hiển thị 1-{filtered.length} / {filtered.length} tài khoản</span>
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
