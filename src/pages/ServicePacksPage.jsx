import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { Search, SlidersHorizontal, Clock, Settings, Package, Coins, TrendingUp, Plus } from 'lucide-react'
import { servicePackStore } from '../store/servicePackStore'

export default function ServicePacksPage() {
    const [packs, setPacks] = useState(() => servicePackStore.getPacks())
    const [search, setSearch] = useState('')

    useEffect(() => {
        const unsub = servicePackStore.subscribe(updated => setPacks([...updated]))
        return unsub
    }, [])

    const filtered = packs.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase())
    )

    const totalPacks = packs.length
    const activePacks = packs.filter(p => p.status === 'active').length
    const totalSubscribers = packs.reduce((sum, p) => sum + p.subscribers, 0)


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
                        <div className="stat-card-icon blue"><Coins size={22} /></div>
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
                                <th>Credit</th>
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
                                    <td>
                                        <div className="cell-credit">
                                            <Coins size={14} />
                                            <span style={{ fontWeight: 600 }}>{pack.credits.toLocaleString()}</span>
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
