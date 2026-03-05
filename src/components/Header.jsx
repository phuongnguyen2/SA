import { useLocation } from 'react-router-dom'
import { Menu, ChevronRight } from 'lucide-react'

const routeMeta = {
    '/customers': { section: 'Quản lý chung', page: 'Khách Hàng' },
    '/service-packs': { section: 'Quản lý chung', page: 'Gói Dịch Vụ' },
    '/orders': { section: 'Quản lý chung', page: 'Đơn Hàng' },
    '/accounts': { section: 'Quản lý chung', page: 'Tài Khoản' },
}

export default function Header() {
    const location = useLocation()
    const meta = routeMeta[location.pathname] || { section: '', page: '' }

    return (
        <div className="page-header">
            <div className="breadcrumb">
                <Menu size={18} />
                <span>VAI-O</span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span>{meta.section}</span>
                <ChevronRight size={14} className="breadcrumb-separator" />
                <span className="breadcrumb-current">{meta.page}</span>
            </div>
            <div className="header-avatar" id="user-avatar" title="Super Admin">
                SA
            </div>
        </div>
    )
}
