import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import {
    ArrowLeft, Building2, Calendar, Clock, Users,
    FileText, Download, HardDrive,
    CheckCircle, AlertCircle, Package, Save, Pencil, X, Crown, Star, Coins, TimerOff, FlaskConical, Trash2
} from 'lucide-react'
import './CustomerDetailPage.css'

/* ============================================================
   MOCK DATA
   ============================================================ */
const makeMockData = () => ({
    1: {
        org: 'Công ty Cổ phần PT Hub', sub: 'PT Hub', email: 'huhu13999@gmail.com',
        accountStatus: 'pro', members: 4, createdAt: '27/02/2026, 03:38',
        plans: [
            {
                name: 'Free Bonus', status: 'active',
                price: 0, credits: 500, usedCredits: 120
            },
            {
                name: 'Starter', status: 'active',
                price: 99000, credits: 1300, usedCredits: 200
            },
        ],
        creditSummary: { totalCredits: 1800, usedCredits: 320, aiCredits: 200, storageCredits: 120 },
        invoices: [
            { id: 'INV-001', date: '27/02/2026', amount: '0 VND', plan: 'Free Bonus', status: 'paid', method: 'Miễn phí' },
            { id: 'INV-002', date: '01/03/2026', amount: '99.000 VND', plan: 'Starter', status: 'paid', method: 'Chuyển khoản' },
        ],
        owner: { fullName: 'Phạm Thanh Hiền', email: 'hienpt@pthub.vn', phone: '0912345678' },
        billing: { orgName: 'Công ty Cổ phần PT Hub', email: 'billing@pthub.vn', phone: '0248888999', taxCode: '0108123456', address: 'Tầng 5, Tòa nhà Hub, Cầu Giấy, Hà Nội' },
    },
    2: {
        org: 'PTH', sub: 'PTH', email: 'yangmin@gmail.com',
        accountStatus: 'pro', members: 3, createdAt: '25/02/2026, 03:25',
        plans: [
            { name: 'Free', status: 'active', price: 0, credits: 300, usedCredits: 80 },
            { name: 'Professional', status: 'active', price: 299000, credits: 3000, usedCredits: 500 },
        ],
        creditSummary: { totalCredits: 3300, usedCredits: 580, aiCredits: 420, storageCredits: 160 },
        invoices: [
            { id: 'INV-003', date: '25/02/2026', amount: '0 VND', plan: 'Free', status: 'paid', method: 'Miễn phí' },
            { id: 'INV-004', date: '28/02/2026', amount: '299.000 VND', plan: 'Professional', status: 'paid', method: 'Thẻ tín dụng' },
        ],
        owner: { fullName: 'Yang Min', email: 'yangmin@gmail.com', phone: '0901234567' },
        billing: { orgName: 'Công ty TNHH PTH', email: 'finance@pth.vn', phone: '19001234', taxCode: '0308654321', address: '123 Quận 1, TP. Hồ Chí Minh' },
    },
    3: {
        org: 'Meeting App Company', sub: 'MAC', email: 'mungnguyenvcu@gmail.com',
        accountStatus: 'trial', members: 1, createdAt: '24/02/2026, 09:01',
        trialExpiresAt: '26/03/2026',
        plans: [
            { name: 'Trial', status: 'active', price: 0, credits: 150, usedCredits: 45 },
        ],
        creditSummary: { totalCredits: 150, usedCredits: 45, aiCredits: 30, storageCredits: 15 },
        invoices: [
            { id: 'INV-005', date: '24/02/2026', amount: '0 VND', plan: 'Trial', status: 'paid', method: 'Miễn phí' },
        ],
        owner: { fullName: 'Nguyễn Văn Mừng', email: 'mungnguyenvcu@gmail.com', phone: '0333444555' },
        billing: { orgName: 'Meeting App Company', email: 'billing@mac.vn', phone: '0246667778', taxCode: '0101112223', address: 'Khu công nghệ cao Hòa Lạc, Thạch Thất, Hà Nội' },
    },
})

const buildAllData = () => {
    const data = makeMockData()
    const statuses = ['trial', 'pro', 'expire', 'delete']
    for (let i = 4; i <= 10; i++) {
        if (!data[i]) {
            const st = statuses[i % statuses.length]
            const isTrial = st === 'trial'
            const isExpire = st === 'expire'
            const isDelete = st === 'delete'
            const totalCredits = (isTrial || isExpire) ? 150 : (isDelete ? 0 : 300)
            const usedCredits = isExpire ? totalCredits : isTrial ? 30 : 0
            const aiCredits = isExpire ? Math.round(totalCredits * 0.67) : isTrial ? 20 : 0
            const storageCredits = isExpire ? totalCredits - aiCredits : isTrial ? 10 : 0
            data[i] = {
                org: 'Meeting App Company', sub: 'MAC', email: `user${i}@mac.vn`,
                accountStatus: st, members: 1, createdAt: '12/02/2026, 16:40',
                plans: isDelete ? [] : isExpire ? [
                    { name: 'Trial', status: 'exhausted', price: 0, credits: 100, usedCredits: 100 },
                    { name: 'Bonus Credit', status: 'exhausted', price: 0, credits: 50, usedCredits: 50 }
                ] : [
                    { name: isTrial ? 'Trial' : 'Free', status: 'active', price: 0, credits: totalCredits, usedCredits },
                ],
                owner: { fullName: 'Nguyễn Văn A', email: `owner${i}@gmail.com`, phone: '0987654321' },
                billing: { orgName: 'Công ty Meeting App', email: `billing${i}@mac.vn`, phone: '0241234567', taxCode: '0101234567', address: 'Số 1 Đống Đa, Hà Nội' },
                creditSummary: { totalCredits, usedCredits, aiCredits, storageCredits },
                invoices: isDelete ? [] : [
                    { id: `INV-00${i}`, date: '12/02/2026', amount: '0 VND', plan: isExpire || isTrial ? 'Trial' : 'Free', status: 'paid', method: 'Miễn phí' },
                ],
            }
        }
    }
    return data
}

const addTrialExpiry = (customer) => {
    const needsExpiry = (customer.accountStatus === 'trial') && !customer.trialExpiresAt
    if (!needsExpiry) return customer
    const [datePart] = customer.createdAt.split(', ')
    const [d, m, y] = datePart.split('/')
    const base = new Date(`${y}-${m}-${d}`)
    base.setDate(base.getDate() + 30)
    const dd = String(base.getDate()).padStart(2, '0')
    const mm = String(base.getMonth() + 1).padStart(2, '0')
    const yyyy = base.getFullYear()
    return { ...customer, trialExpiresAt: `${dd}/${mm}/${yyyy}` }
}

const allMockData = (() => {
    const raw = buildAllData()
    return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, addTrialExpiry(v)]))
})()

const accountStatusOptions = [
    { value: 'trial', label: 'Trial', icon: FlaskConical },
    { value: 'pro', label: 'Pro', icon: Crown },
    { value: 'expire', label: 'Expire', icon: TimerOff },
    { value: 'delete', label: 'Delete', icon: Trash2 },
]

const planStatusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'exhausted', label: 'Exhausted' },
]

/* ============================================================
   COMPONENT
   ============================================================ */
export default function CustomerDetailPage() {
    const { id } = useParams()
    const initial = allMockData[id]

    const [customer, setCustomer] = useState(initial ? JSON.parse(JSON.stringify(initial)) : null)
    const [saved, setSaved] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState(null)

    if (!customer) {
        return (
            <>
                <Header />
                <div className="page-body fade-in">
                    <div className="empty-state">
                        <AlertCircle />
                        <p>Không tìm thấy khách hàng</p>
                        <Link to="/customers" className="back-link" style={{ marginTop: 16 }}>
                            <ArrowLeft size={16} /> Quay lại danh sách
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    /* --- helpers --- */
    const updateField = (field, value) => {
        setCustomer(prev => ({ ...prev, [field]: value }))
        setSaved(false)
    }
    const updatePlan = (idx, field, value) => {
        setCustomer(prev => {
            const plans = [...prev.plans]
            plans[idx] = { ...plans[idx], [field]: value }
            return { ...prev, plans }
        })
        setSaved(false)
    }
    const updateOwnerField = (field, value) => {
        setCustomer(prev => ({ ...prev, owner: { ...prev.owner, [field]: value } }))
        setSaved(false)
    }
    const updateBillingField = (field, value) => {
        setCustomer(prev => ({ ...prev, billing: { ...prev.billing, [field]: value } }))
        setSaved(false)
    }
    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const pct = (used, max) => max > 0 ? Math.min(100, (used / max) * 100) : 0

    const currentAccountStatus = accountStatusOptions.find(o => o.value === customer.accountStatus) || accountStatusOptions[3]

    return (
        <>
            <div className="customer-detail-page-container">
                <Header />

                {/* ===== Sticky Top Action Bar ===== */}
                <div className="detail-top-action-bar fade-in">
                    <div className="action-bar-left">
                        <Link to="/customers" className="back-link" id="btn-back">
                            <ArrowLeft size={16} /> Quay lại danh sách
                        </Link>
                        <div className="action-bar-divider"></div>
                        <h1 className="action-bar-title">Chi tiết Khách hàng</h1>
                    </div>
                    <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={handleSave} id="btn-save">
                        {saved ? <CheckCircle size={16} /> : <Save size={16} />}
                        {saved ? 'Đã lưu thành công!' : 'Lưu thay đổi'}
                    </button>
                </div>

                <div className="page-body detail-modern-body fade-in">
                    <div className="detail-dashboard-layout">
                        {/* ========== LEFT SIDEBAR ========== */}
                        <div className="detail-sidebar">

                            {/* 1. Organization & Status */}
                            <div className="modern-card org-card">
                                <div className="org-card-header">
                                    <div className="detail-header-icon">
                                        <Building2 size={24} />
                                    </div>
                                    <div className="org-card-status">
                                        <select className="edit-select modern-status-select" value={customer.accountStatus} onChange={e => {
                                            const st = e.target.value;
                                            setCustomer(prev => {
                                                const isTrial = st === 'trial';
                                                const isExpire = st === 'expire';
                                                const isDelete = st === 'delete';
                                                let newPlans = prev.plans;
                                                let newSummary = { ...prev.creditSummary };
                                                if (isDelete) {
                                                    newPlans = [];
                                                    newSummary = { totalCredits: 0, usedCredits: 0, aiCredits: 0, storageCredits: 0 };
                                                } else if (isExpire) {
                                                    if (prev.plans && prev.plans.length > 0) {
                                                        newPlans = prev.plans.map(p => ({
                                                            ...p, status: 'exhausted', usedCredits: p.credits
                                                        }));
                                                        const total = newPlans.reduce((sum, p) => sum + p.credits, 0);
                                                        newSummary = { totalCredits: total, usedCredits: total, aiCredits: Math.round(total * 0.67), storageCredits: total - Math.round(total * 0.67) };
                                                    } else {
                                                        const tCredit = 150;
                                                        newSummary = { totalCredits: tCredit, usedCredits: tCredit, aiCredits: Math.round(tCredit * 0.67), storageCredits: tCredit - Math.round(tCredit * 0.67) };
                                                        newPlans = [
                                                            { name: 'Trial', status: 'exhausted', price: 0, credits: 100, usedCredits: 100 },
                                                            { name: 'Bonus Credit', status: 'exhausted', price: 0, credits: 50, usedCredits: 50 }
                                                        ];
                                                    }
                                                } else if (isTrial) {
                                                    const tCredit = 150;
                                                    newSummary = { totalCredits: tCredit, usedCredits: 30, aiCredits: 20, storageCredits: 10 };
                                                    newPlans = [{ name: 'Trial', status: 'active', price: 0, credits: tCredit, usedCredits: 30 }];
                                                }
                                                return { ...prev, accountStatus: st, plans: newPlans, creditSummary: newSummary };
                                            });
                                            setSaved(false);
                                        }} id="select-status"
                                            style={{
                                                background: customer.accountStatus === 'pro' ? 'linear-gradient(135deg, #F5A623, #F7C948)' :
                                                    customer.accountStatus === 'expire' ? 'var(--color-danger-bg)' :
                                                        customer.accountStatus === 'trial' ? 'var(--color-success-bg)' : '#F0F0F0',
                                                color: customer.accountStatus === 'pro' ? '#7C4A00' :
                                                    customer.accountStatus === 'expire' ? 'var(--color-danger)' :
                                                        customer.accountStatus === 'trial' ? 'var(--color-success)' : '#777',
                                            }}
                                        >
                                            {accountStatusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="org-card-body">
                                    <div className="editable-row">
                                        <input className="edit-input title-input" value={customer.org} onChange={e => updateField('org', e.target.value)} id="input-org" placeholder="Tên tổ chức" />
                                        <Pencil size={14} className="edit-hint" />
                                    </div>
                                    <div className="org-meta-list">
                                        <div className="meta-item">
                                            <span className="meta-icon">@</span>
                                            <input className="edit-input small-input tag-input" value={customer.sub} onChange={e => updateField('sub', e.target.value)} id="input-sub" placeholder="Subdomain" />
                                        </div>
                                        <div className="meta-item">
                                            <FileText size={13} className="meta-icon" />
                                            <input className="edit-input small-input" value={customer.email} onChange={e => updateField('email', e.target.value)} id="input-email" placeholder="Email liên hệ" />
                                        </div>
                                    </div>
                                </div>

                                <div className="org-card-footer">
                                    <div className="detail-stat"><Users size={15} /><span><strong>{customer.members}</strong> nhân viên</span></div>
                                    <div className="detail-stat"><Calendar size={15} /><span>Tạo: {customer.createdAt}</span></div>
                                    {customer.accountStatus === 'trial' && customer.trialExpiresAt && (
                                        <div className="detail-stat trial-expiry-stat">
                                            <Clock size={15} />
                                            <span>Hết hạn: <strong>{customer.trialExpiresAt}</strong></span>
                                        </div>
                                    )}
                                    {customer.accountStatus === 'expire' && (
                                        <div className="detail-stat expire-alert">
                                            <TimerOff size={15} />
                                            <span><strong>Đã dùng hết Credit</strong></span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 2. Owner Information */}
                            <div className="modern-card">
                                <h3 className="modern-card-title"><Users size={18} /> Thông tin chủ sở hữu</h3>
                                <div className="modern-form-grid">
                                    <div className="info-field">
                                        <label>Họ tên chủ sở hữu</label>
                                        <input className="edit-input" value={customer.owner?.fullName || ''} onChange={e => updateOwnerField('fullName', e.target.value)} />
                                    </div>
                                    <div className="info-field">
                                        <label>Email</label>
                                        <input className="edit-input" value={customer.owner?.email || ''} onChange={e => updateOwnerField('email', e.target.value)} />
                                    </div>
                                    <div className="info-field">
                                        <label>Số điện thoại</label>
                                        <input className="edit-input" value={customer.owner?.phone || ''} onChange={e => updateOwnerField('phone', e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* 3. Billing Information */}
                            <div className="modern-card">
                                <h3 className="modern-card-title"><FileText size={18} /> Thông tin hoá đơn</h3>
                                <div className="modern-form-grid">
                                    <div className="info-field full-width">
                                        <label>Tên tổ chức</label>
                                        <input className="edit-input" value={customer.billing?.orgName || ''} onChange={e => updateBillingField('orgName', e.target.value)} />
                                    </div>
                                    <div className="info-field">
                                        <label>Email</label>
                                        <input className="edit-input" value={customer.billing?.email || ''} onChange={e => updateBillingField('email', e.target.value)} />
                                    </div>
                                    <div className="info-field">
                                        <label>Số điện thoại</label>
                                        <input className="edit-input" value={customer.billing?.phone || ''} onChange={e => updateBillingField('phone', e.target.value)} />
                                    </div>
                                    <div className="info-field full-width">
                                        <label>Mã số thuế</label>
                                        <input className="edit-input" value={customer.billing?.taxCode || ''} onChange={e => updateBillingField('taxCode', e.target.value)} />
                                    </div>
                                    <div className="info-field full-width">
                                        <label>Địa chỉ</label>
                                        <input className="edit-input" value={customer.billing?.address || ''} onChange={e => updateBillingField('address', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ========== RIGHT MAIN CONTENT ========== */}
                        <div className="detail-main-content">

                            {/* 1. Credit & Usage (aggregated) */}
                            <section className="modern-section">
                                <div className="section-header-row">
                                    <h2 className="modern-section-title">
                                        <div className="icon-box"><Coins size={20} /></div>
                                        Credit & Usage tổng hợp
                                    </h2>
                                    <span className="readonly-badge">Chỉ xem</span>
                                </div>
                                <div className="credit-usage-card modern-card styling-no-padding">
                                    {(() => {
                                        const isDepleted = customer.accountStatus === 'expire' || customer.accountStatus === 'delete';
                                        const cs = customer.creditSummary;
                                        return (
                                            <div className={`iphone-storage-container ${isDepleted ? 'depleted' : ''}`}>
                                                <div className="iphone-storage-header">
                                                    <div className="storage-header-left">
                                                        <span className="used-text">
                                                            {isDepleted ? '0' : (cs.totalCredits - cs.usedCredits).toLocaleString()} credits
                                                        </span>
                                                        <span className="used-label">{isDepleted ? 'còn lại' : 'còn lại'}</span>
                                                    </div>
                                                    <div className="storage-header-right">
                                                        {isDepleted
                                                            ? (customer.accountStatus === 'delete' ? 'Đã xoá dữ liệu' : 'Hết credit – dữ liệu chưa xoá')
                                                            : `tổng ${cs.totalCredits.toLocaleString()} credits`
                                                        }
                                                    </div>
                                                </div>

                                                <div className={`iphone-storage-bar ${isDepleted ? 'bar-depleted' : ''}`}>
                                                    {isDepleted ? (
                                                        <div className="storage-seg seg-depleted" style={{ width: '100%' }} />
                                                    ) : (
                                                        <>
                                                            <div
                                                                className="storage-seg seg-ai"
                                                                style={{ width: `${cs.totalCredits > 0 ? (cs.aiCredits / cs.totalCredits) * 100 : 0}%` }}
                                                            />
                                                            <div
                                                                className="storage-seg seg-storage"
                                                                style={{ width: `${cs.totalCredits > 0 ? (cs.storageCredits / cs.totalCredits) * 100 : 0}%` }}
                                                            />
                                                        </>
                                                    )}
                                                </div>

                                                <div className="iphone-storage-legend">
                                                    {isDepleted ? (
                                                        <div className="storage-legend-item">
                                                            <div className="legend-dot dot-depleted" />
                                                            <span className="legend-name">
                                                                {customer.accountStatus === 'delete' ? 'Đã xoá dữ liệu' : 'Đã dùng hết credit'}
                                                            </span>
                                                            <span className="legend-size">0 credits còn lại</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="storage-legend-item">
                                                                <div className="legend-dot dot-ai" />
                                                                <span className="legend-name">AI</span>
                                                                <span className="legend-size">{cs.aiCredits.toLocaleString()}</span>
                                                            </div>
                                                            <div className="storage-legend-item">
                                                                <div className="legend-dot dot-storage" />
                                                                <span className="legend-name">Lưu trữ</span>
                                                                <span className="legend-size">{cs.storageCredits.toLocaleString()}</span>
                                                            </div>
                                                            <div className="storage-legend-item">
                                                                <div className="legend-dot dot-remaining" />
                                                                <span className="legend-name">Trống</span>
                                                                <span className="legend-size">{(cs.totalCredits - cs.usedCredits).toLocaleString()}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </section>

                            {/* 2. Service Plans */}
                            <section className="modern-section">
                                <div className="section-header-row">
                                    <h2 className="modern-section-title">
                                        <div className="icon-box"><Package size={20} /></div>
                                        Gói dịch vụ đang sử dụng
                                    </h2>
                                </div>
                                {customer.plans.length === 0 ? (
                                    <div className="empty-state modern-empty" style={{ padding: '60px 0', gap: 12 }}>
                                        <div className="empty-icon-wrap"><Package size={32} /></div>
                                        <p>Chưa có gói dịch vụ</p>
                                    </div>
                                ) : (
                                    <div className="plans-grid">
                                        {customer.plans.map((plan, idx) => (
                                            <div className="plan-card modern-plan-card" key={idx} onClick={() => setSelectedPlan(plan)}>
                                                <div className="plan-card-header">
                                                    <input className="edit-input plan-name-input" value={plan.name} onChange={e => {
                                                        e.stopPropagation()
                                                        updatePlan(idx, 'name', e.target.value)
                                                    }} />
                                                    <select className="edit-select modern-status-select" value={plan.status} onClick={e => e.stopPropagation()} onChange={e => {
                                                        e.stopPropagation()
                                                        updatePlan(idx, 'status', e.target.value)
                                                    }}
                                                        style={{
                                                            background: plan.status === 'active' ? 'var(--color-success)' : 'var(--color-danger-bg)',
                                                            color: plan.status === 'active' ? 'white' : 'var(--color-danger)',
                                                        }}
                                                    >
                                                        {planStatusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                                    </select>
                                                </div>
                                                <div className="plan-badges-row">
                                                    <span className="plan-credit-badge">
                                                        <Coins size={13} /> {plan.credits.toLocaleString()} credits
                                                    </span>
                                                    {plan.price > 0 && (
                                                        <span className="plan-price-badge">
                                                            {plan.price.toLocaleString()} VND
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="plan-card-footer">
                                                    Click để xem chi tiết →
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* 3. Invoice History */}
                            <section className="modern-section">
                                <div className="section-header-row">
                                    <h2 className="modern-section-title">
                                        <div className="icon-box"><FileText size={20} /></div>
                                        Lịch sử hoá đơn
                                    </h2>
                                    <span className="readonly-badge">Chỉ xem</span>
                                </div>
                                <div className="data-table-wrapper modern-table-wrapper">
                                    <table className="data-table modern-table">
                                        <thead>
                                            <tr>
                                                <th>Mã hoá đơn</th>
                                                <th>Ngày</th>
                                                <th>Gói dịch vụ</th>
                                                <th>Số tiền</th>
                                                <th>Phương thức</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customer.invoices.map(inv => (
                                                <tr key={inv.id}>
                                                    <td><span className="invoice-id-span">{inv.id}</span></td>
                                                    <td><div className="cell-date"><Calendar size={13} />{inv.date}</div></td>
                                                    <td><span className="plan-tag modern-plan-tag">{inv.plan}</span></td>
                                                    <td style={{ fontWeight: 600 }}>{inv.amount}</td>
                                                    <td className="cell-email">{inv.method}</td>
                                                    <td>
                                                        <span className={`status-badge modern-badge ${inv.status === 'paid' ? 'active' : 'pending'}`}>
                                                            {inv.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                                        </span>
                                                    </td>
                                                    <td><button className="action-btn modern-action-btn" title="Tải hoá đơn"><Download size={16} /></button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Credit Detail Modal ===== */}
            {
                selectedPlan && (
                    <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3><Coins size={20} /> Chi tiết Credit: {selectedPlan.name}</h3>
                                <button className="close-btn" onClick={() => setSelectedPlan(null)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="quota-grid">
                                    <div className="quota-item" style={{ gridColumn: 'span 2' }}>
                                        <span className="quota-label">Credit Usage</span>
                                        <div className="quota-value-row" style={{ marginBottom: 8 }}>
                                            <span className="quota-value-used">{(selectedPlan.usedCredits || 0).toLocaleString()}</span>
                                            <span className="quota-unit">/ {(selectedPlan.credits || 0).toLocaleString()} credits</span>
                                        </div>
                                        <div className="usage-bar" style={{ height: 10, borderRadius: 5 }}>
                                            <div className="usage-bar-fill" style={{
                                                width: `${selectedPlan.credits > 0 ? Math.min(100, ((selectedPlan.usedCredits || 0) / selectedPlan.credits) * 100) : 0}%`,
                                                borderRadius: 5
                                            }} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.8rem' }}>
                                            <span style={{ color: 'var(--color-text-muted)' }}>Đã sử dụng</span>
                                            <span style={{ fontWeight: 700, color: selectedPlan.credits > 0 && ((selectedPlan.usedCredits || 0) / selectedPlan.credits) >= 0.8 ? 'var(--color-danger)' : 'var(--color-primary)' }}>
                                                {selectedPlan.credits > 0 ? (((selectedPlan.usedCredits || 0) / selectedPlan.credits) * 100).toFixed(1) : 0}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="quota-item">
                                        <span className="quota-label">Tổng Credit</span>
                                        <div className="quota-value-row">
                                            <span className="quota-value-used">{(selectedPlan.credits || 0).toLocaleString()}</span>
                                            <span className="quota-unit">credits</span>
                                        </div>
                                    </div>
                                    <div className="quota-item">
                                        <span className="quota-label">Còn lại</span>
                                        <div className="quota-value-row">
                                            <span className="quota-value-used" style={{ color: 'var(--color-success)' }}>
                                                {((selectedPlan.credits || 0) - (selectedPlan.usedCredits || 0)).toLocaleString()}
                                            </span>
                                            <span className="quota-unit">credits</span>
                                        </div>
                                    </div>
                                    <div className="quota-item">
                                        <span className="quota-label">Giá gói</span>
                                        <div className="quota-value-row">
                                            <span className="quota-value-used">{selectedPlan.price > 0 ? selectedPlan.price.toLocaleString() + ' VND' : 'Miễn phí'}</span>
                                        </div>
                                    </div>
                                    <div className="quota-item">
                                        <span className="quota-label">Trạng thái</span>
                                        <div className="quota-value-row">
                                            <span className="quota-value-used">{selectedPlan.status === 'active' ? 'Active' : 'Exhausted'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
