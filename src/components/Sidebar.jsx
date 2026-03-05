import { NavLink, useLocation } from 'react-router-dom'
import { Users, Package, ShoppingCart, UserCog, Zap } from 'lucide-react'
import './Sidebar.css'

const navItems = [
    { path: '/customers', label: 'Quản lý khách hàng', icon: Users },
    { path: '/service-packs', label: 'Quản lý gói dịch vụ', icon: Package },
    { path: '/orders', label: 'Quản lý đơn hàng', icon: ShoppingCart },
    { path: '/accounts', label: 'Quản lý tài khoản', icon: UserCog },
]

export default function Sidebar() {
    const location = useLocation()

    return (
        <aside className="sidebar">
            {/* Logo area */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">
                    <Zap size={22} />
                </div>
                <div className="sidebar-logo-text">
                    <span className="sidebar-logo-title">VAI-O Super Admin</span>
                    <span className="sidebar-logo-sub">Meeting</span>
                </div>
            </div>

            {/* Section label */}
            <div className="sidebar-section-label">CHÍNH</div>

            {/* Nav links */}
            <nav className="sidebar-nav">
                {navItems.map(item => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                            id={`nav-${item.path.replace('/', '')}`}
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </NavLink>
                    )
                })}
            </nav>
        </aside>
    )
}
