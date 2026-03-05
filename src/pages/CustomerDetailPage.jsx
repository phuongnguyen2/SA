import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import {
    ArrowLeft, Building2, Calendar, Clock, Users, HardDrive,
    Video, Timer, RotateCcw, Lock, Trash2, FileText, Download,
    CheckCircle, AlertCircle, Package, Save, Pencil, X, Crown, Star
} from 'lucide-react'
import './CustomerDetailPage.css'

/* ============================================================
   MOCK DATA
   ============================================================ */
const makeMockData = () => ({
    1: {
        org: 'Công ty Cổ phần PT Hub', sub: 'PT Hub', email: 'huhu13999@gmail.com',
        status: 'active', members: 4, createdAt: '27/02/2026, 03:38',
        lockedAt: '', dbDeletedAt: '',
        plans: [
            {
                name: 'free_bonus', status: 'active', resetCycle: '30',
                activatedAt: '2026-02-27', expiresAt: '2026-03-27',
                type: 'addon', priority: 3,
                quotas: {
                    maxMembers: 10, meetingMinutesInCycle: 500, meetingMinutesOutCycle: 50,
                    storageLimit: 5, maxMeetingsPerDay: 5, maxMinutesPerMeeting: 60
                }
            },
            {
                name: 'starter', status: 'active', resetCycle: '30',
                activatedAt: '2026-03-01', expiresAt: '2026-04-01',
                type: 'main', priority: 1,
                quotas: {
                    maxMembers: 20, meetingMinutesInCycle: 1300, meetingMinutesOutCycle: 130,
                    storageLimit: 20, maxMeetingsPerDay: 15, maxMinutesPerMeeting: 120
                }
            },
        ],
        // Aggregated limits & usage (totals across all plans)
        limits: {
            maxMembers: 30, usageMembers: 4,
            meetingMinutesInCycle: 1800, usageMinutesInCycle: 320,
            meetingMinutesOutCycle: 180, usageMinutesOutCycle: 15,
            storageLimit: 25, usageStorage: 3.2,
            maxMeetingsPerDay: 20, usageMeetingsToday: 2,
            maxMinutesPerMeeting: 120, usageAvgMinutes: 42,
        },
        invoices: [
            { id: 'INV-001', date: '27/02/2026', amount: '0 VND', plan: 'free_bonus', status: 'paid', method: 'Miễn phí' },
            { id: 'INV-002', date: '01/03/2026', amount: '99.000 VND', plan: 'starter', status: 'paid', method: 'Chuyển khoản' },
        ],
        owner: {
            fullName: 'Phạm Thanh Hiền',
            email: 'hienpt@pthub.vn',
            phone: '0912345678'
        },
        billing: {
            orgName: 'Công ty Cổ phần PT Hub',
            email: 'billing@pthub.vn',
            phone: '0248888999',
            taxCode: '0108123456',
            address: 'Tầng 5, Tòa nhà Hub, Cầu Giấy, Hà Nội'
        },
    },
    2: {
        org: 'PTH', sub: 'PTH', email: 'yangmin@gmail.com',
        status: 'active', members: 3, createdAt: '25/02/2026, 03:25',
        lockedAt: '', dbDeletedAt: '',
        plans: [
            {
                name: 'free', status: 'active', resetCycle: '30',
                activatedAt: '2026-02-25', expiresAt: '2026-03-25',
                type: 'addon', priority: 3,
                quotas: {
                    maxMembers: 5, meetingMinutesInCycle: 300, meetingMinutesOutCycle: 30,
                    storageLimit: 2, maxMeetingsPerDay: 3, maxMinutesPerMeeting: 45
                }
            },
            {
                name: 'professional', status: 'active', resetCycle: '30',
                activatedAt: '2026-02-28', expiresAt: '2026-03-28',
                type: 'main', priority: 1,
                quotas: {
                    maxMembers: 50, meetingMinutesInCycle: 3000, meetingMinutesOutCycle: 300,
                    storageLimit: 50, maxMeetingsPerDay: 30, maxMinutesPerMeeting: 180
                }
            },
        ],
        limits: {
            maxMembers: 55, usageMembers: 3,
            meetingMinutesInCycle: 3300, usageMinutesInCycle: 580,
            meetingMinutesOutCycle: 330, usageMinutesOutCycle: 45,
            storageLimit: 52, usageStorage: 8.5,
            maxMeetingsPerDay: 33, usageMeetingsToday: 5,
            maxMinutesPerMeeting: 180, usageAvgMinutes: 65,
        },
        invoices: [
            { id: 'INV-003', date: '25/02/2026', amount: '0 VND', plan: 'free', status: 'paid', method: 'Miễn phí' },
            { id: 'INV-004', date: '28/02/2026', amount: '299.000 VND', plan: 'professional', status: 'paid', method: 'Thẻ tín dụng' },
        ],
        owner: {
            fullName: 'Yang Min',
            email: 'yangmin@gmail.com',
            phone: '0901234567'
        },
        billing: {
            orgName: 'Công ty TNHH PTH',
            email: 'finance@pth.vn',
            phone: '19001234',
            taxCode: '0308654321',
            address: '123 Quận 1, TP. Hồ Chí Minh'
        },
    },
    3: {
        org: 'Meeting App Company', sub: 'MAC', email: 'mungnguyenvcu@gmail.com',
        status: 'active', members: 1, createdAt: '24/02/2026, 09:01',
        lockedAt: '', dbDeletedAt: '',
        plans: [
            {
                name: 'free', status: 'active', resetCycle: '30',
                activatedAt: '2026-02-24', expiresAt: '2026-03-24',
                type: 'main', priority: 3,
                quotas: {
                    maxMembers: 5, meetingMinutesInCycle: 300, meetingMinutesOutCycle: 30,
                    storageLimit: 2, maxMeetingsPerDay: 3, maxMinutesPerMeeting: 45
                }
            },
        ],
        limits: {
            maxMembers: 5, usageMembers: 1,
            meetingMinutesInCycle: 300, usageMinutesInCycle: 45,
            meetingMinutesOutCycle: 30, usageMinutesOutCycle: 0,
            storageLimit: 2, usageStorage: 0.3,
            maxMeetingsPerDay: 3, usageMeetingsToday: 1,
            maxMinutesPerMeeting: 45, usageAvgMinutes: 22,
        },
        invoices: [
            { id: 'INV-005', date: '24/02/2026', amount: '0 VND', plan: 'free', status: 'paid', method: 'Miễn phí' },
        ],
        owner: {
            fullName: 'Nguyễn Văn Mừng',
            email: 'mungnguyenvcu@gmail.com',
            phone: '0333444555'
        },
        billing: {
            orgName: 'Meeting App Company',
            email: 'billing@mac.vn',
            phone: '0246667778',
            taxCode: '0101112223',
            address: 'Khu công nghệ cao Hòa Lạc, Thạch Thất, Hà Nội'
        },
    },
})

const buildAllData = () => {
    const data = makeMockData()
    for (let i = 4; i <= 10; i++) {
        if (!data[i]) {
            data[i] = {
                org: 'Meeting App Company', sub: 'MAC', email: `user${i}@mac.vn`,
                status: 'active', members: 1, createdAt: '12/02/2026, 16:40',
                lockedAt: '', dbDeletedAt: '',
                plans: [
                    {
                        name: 'free', status: 'active', resetCycle: '30',
                        activatedAt: '2026-02-12', expiresAt: '2026-03-12',
                        type: 'main', priority: 3,
                        quotas: {
                            maxMembers: 5, meetingMinutesInCycle: 300, meetingMinutesOutCycle: 30,
                            storageLimit: 2, maxMeetingsPerDay: 3, maxMinutesPerMeeting: 45
                        }
                    },
                ],
                owner: {
                    fullName: 'Nguyễn Văn A',
                    email: `owner${i}@gmail.com`,
                    phone: '0987654321'
                },
                billing: {
                    orgName: 'Công ty Meeting App',
                    email: `billing${i}@mac.vn`,
                    phone: '0241234567',
                    taxCode: '0101234567',
                    address: 'Số 1 Đống Đa, Hà Nội'
                },
                limits: {
                    maxMembers: 5, usageMembers: 1,
                    meetingMinutesInCycle: 300, usageMinutesInCycle: 30,
                    meetingMinutesOutCycle: 30, usageMinutesOutCycle: 0,
                    storageLimit: 2, usageStorage: 0.1,
                    maxMeetingsPerDay: 3, usageMeetingsToday: 0,
                    maxMinutesPerMeeting: 45, usageAvgMinutes: 0,
                },
                invoices: [
                    { id: `INV-00${i}`, date: '12/02/2026', amount: '0 VND', plan: 'free', status: 'paid', method: 'Miễn phí' },
                ],
            }
        }
    }
    return data
}

const allMockData = buildAllData()

const statusOptions = [
    { value: 'active', label: 'Hoạt động' },
    { value: 'inactive', label: 'Ngừng' },
    { value: 'expired', label: 'Hết hạn' },
]

const priorityConfig = {
    1: { label: 'Cao nhất', className: 'highest' },
    2: { label: 'Cao', className: 'high' },
    3: { label: 'Bình thường', className: 'normal' },
}

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
    const updateLimit = (field, value) => {
        setCustomer(prev => ({
            ...prev,
            limits: { ...prev.limits, [field]: value },
        }))
        setSaved(false)
    }
    const updateOwnerField = (field, value) => {
        setCustomer(prev => ({
            ...prev,
            owner: { ...prev.owner, [field]: value }
        }))
        setSaved(false)
    }
    const updateBillingField = (field, value) => {
        setCustomer(prev => ({
            ...prev,
            billing: { ...prev.billing, [field]: value }
        }))
        setSaved(false)
    }
    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const pct = (used, max) => max > 0 ? Math.min(100, (used / max) * 100) : 0

    return (
        <>
            <Header />
            <div className="page-body fade-in">

                {/* ===== Top bar ===== */}
                <div className="detail-top-bar">
                    <Link to="/customers" className="back-link" id="btn-back">
                        <ArrowLeft size={16} /> Quay lại danh sách khách hàng
                    </Link>
                    <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={handleSave} id="btn-save">
                        {saved ? <CheckCircle size={16} /> : <Save size={16} />}
                        {saved ? 'Đã lưu!' : 'Lưu thay đổi'}
                    </button>
                </div>

                {/* ===== Organization Header ===== */}
                <div className="detail-header">
                    <div className="detail-header-icon">
                        <Building2 size={28} />
                    </div>
                    <div className="detail-header-info">
                        <div className="editable-row">
                            <input className="edit-input title-input" value={customer.org} onChange={e => updateField('org', e.target.value)} id="input-org" />
                            <Pencil size={14} className="edit-hint" />
                        </div>
                        <div className="detail-header-meta">
                            <input className="edit-input small-input tag-input" value={customer.sub} onChange={e => updateField('sub', e.target.value)} id="input-sub" />
                            <span className="detail-meta-divider">•</span>
                            <input className="edit-input small-input" value={customer.email} onChange={e => updateField('email', e.target.value)} style={{ minWidth: 200 }} id="input-email" />
                            <span className="detail-meta-divider">•</span>
                            <select className="edit-select status-select" value={customer.status} onChange={e => updateField('status', e.target.value)} id="select-status">
                                {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="detail-header-stats">
                        <div className="detail-stat"><Users size={16} /><span><strong>{customer.members}</strong> nhân viên</span></div>
                        <div className="detail-stat"><Calendar size={16} /><span>Tạo: {customer.createdAt}</span></div>
                    </div>
                </div>

                {/* ===== Company-level Lock / Delete Dates ===== */}
                <section className="detail-section">
                    <h2 className="detail-section-title"><Lock size={20} /> Ngày khoá & Xoá DB</h2>
                    <div className="company-dates-row">
                        <div className="company-date-field">
                            <label><Lock size={14} /> Ngày khoá</label>
                            <input type="date" className="edit-input" value={customer.lockedAt} onChange={e => updateField('lockedAt', e.target.value)} id="input-locked-at" />
                        </div>
                        <div className="company-date-field">
                            <label><Trash2 size={14} /> Ngày xoá DB</label>
                            <input type="date" className="edit-input" value={customer.dbDeletedAt} onChange={e => updateField('dbDeletedAt', e.target.value)} id="input-db-deleted-at" />
                        </div>
                    </div>
                </section>

                {/* ===== Owner & Billing Information ===== */}
                <div className="info-sections-grid">
                    {/* Owner Information */}
                    <section className="detail-section">
                        <h2 className="detail-section-title"><Users size={20} /> Thông tin chủ sở hữu</h2>
                        <div className="info-card">
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
                    </section>

                    {/* Billing Information */}
                    <section className="detail-section">
                        <h2 className="detail-section-title"><FileText size={20} /> Thông tin hoá đơn</h2>
                        <div className="info-card">
                            <div className="info-field">
                                <label>Tên tổ chức</label>
                                <input className="edit-input" value={customer.billing?.orgName || ''} onChange={e => updateBillingField('orgName', e.target.value)} />
                            </div>
                            <div className="info-field-group">
                                <div className="info-field">
                                    <label>Email</label>
                                    <input className="edit-input" value={customer.billing?.email || ''} onChange={e => updateBillingField('email', e.target.value)} />
                                </div>
                                <div className="info-field">
                                    <label>Số điện thoại</label>
                                    <input className="edit-input" value={customer.billing?.phone || ''} onChange={e => updateBillingField('phone', e.target.value)} />
                                </div>
                            </div>
                            <div className="info-field">
                                <label>Mã số thuế</label>
                                <input className="edit-input" value={customer.billing?.taxCode || ''} onChange={e => updateBillingField('taxCode', e.target.value)} />
                            </div>
                            <div className="info-field">
                                <label>Địa chỉ</label>
                                <input className="edit-input" value={customer.billing?.address || ''} onChange={e => updateBillingField('address', e.target.value)} />
                            </div>
                        </div>
                    </section>
                </div>

                {/* ===== Service Plans ===== */}
                <section className="detail-section">
                    <h2 className="detail-section-title"><Package size={20} /> Gói dịch vụ đang sử dụng</h2>
                    <p className="plan-priority-hint">
                        <Crown size={14} /> Quota sẽ được trừ theo thứ tự ưu tiên: gói có priority cao nhất sẽ bị trừ trước.
                    </p>
                    <div className="plans-grid">
                        {[...customer.plans]
                            .sort((a, b) => (a.priority || 3) - (b.priority || 3))
                            .map((plan, sortedIdx) => {
                                const originalIdx = customer.plans.indexOf(plan)
                                const pCfg = priorityConfig[plan.priority] || priorityConfig[3]
                                return (
                                    <div className={`plan-card ${plan.type === 'main' ? 'plan-card-main' : 'plan-card-addon'}`} key={originalIdx} onClick={() => setSelectedPlan(plan)}>
                                        <div className="plan-card-header">
                                            <div className="plan-card-header-left">
                                                <span className="plan-priority-order">#{sortedIdx + 1}</span>
                                                <input className="edit-input plan-name-input" value={plan.name} onChange={e => {
                                                    e.stopPropagation()
                                                    updatePlan(originalIdx, 'name', e.target.value)
                                                }} />
                                            </div>
                                            <select className="edit-select status-select" value={plan.status} onClick={e => e.stopPropagation()} onChange={e => {
                                                e.stopPropagation()
                                                updatePlan(originalIdx, 'status', e.target.value)
                                            }}>
                                                {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                            </select>
                                        </div>
                                        <div className="plan-badges-row">
                                            <span className={`plan-type-badge ${plan.type === 'main' ? 'main' : 'addon'}`}>
                                                {plan.type === 'main' ? <><Crown size={13} /> Gói chính</> : <><Star size={13} /> Gói phụ</>}
                                            </span>
                                            <div className={`plan-priority-badge ${pCfg.className}`} onClick={e => e.stopPropagation()}>
                                                Ưu tiên:
                                                <input
                                                    type="number"
                                                    className="priority-input-inline"
                                                    value={plan.priority}
                                                    onChange={e => updatePlan(originalIdx, 'priority', Number(e.target.value))}
                                                    min="1"
                                                />
                                            </div>
                                        </div>
                                        <div className="plan-info-grid">
                                            <div className="plan-info-item">
                                                <div className="plan-info-label"><RotateCcw size={14} /> Chu kì reset (ngày)</div>
                                                <input type="number" className="edit-input" value={plan.resetCycle} onClick={e => e.stopPropagation()} onChange={e => {
                                                    e.stopPropagation()
                                                    updatePlan(originalIdx, 'resetCycle', e.target.value)
                                                }} />
                                            </div>
                                            <div className="plan-info-item">
                                                <div className="plan-info-label"><Calendar size={14} /> Ngày kích hoạt</div>
                                                <input type="date" className="edit-input" value={plan.activatedAt} onClick={e => e.stopPropagation()} onChange={e => {
                                                    e.stopPropagation()
                                                    updatePlan(originalIdx, 'activatedAt', e.target.value)
                                                }} />
                                            </div>
                                            <div className="plan-info-item">
                                                <div className="plan-info-label"><Clock size={14} /> Ngày kết thúc</div>
                                                <input type="date" className="edit-input" value={plan.expiresAt} onClick={e => e.stopPropagation()} onChange={e => {
                                                    e.stopPropagation()
                                                    updatePlan(originalIdx, 'expiresAt', e.target.value)
                                                }} />
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600, textAlign: 'right', marginTop: -8 }}>
                                            Click để xem chi tiết quota →
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </section>

                {/* ===== Limits & Usage (aggregated, separate section) ===== */}
                <section className="detail-section">
                    <h2 className="detail-section-title">
                        <Timer size={20} /> Giới hạn & Usage tổng hợp
                        <span className="readonly-badge">Chỉ xem</span>
                    </h2>
                    <div className="limits-section-grid">

                        {/* Row 1 */}
                        <div className="limit-card">
                            <div className="limit-card-icon"><Users size={18} /></div>
                            <div className="limit-card-body">
                                <span className="limit-card-label">Giới hạn nhân sự</span>
                                <div className="limit-card-values">
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{customer.limits.maxMembers}</span>
                                </div>
                                <div className="limit-card-usage">
                                    <div className="usage-bar"><div className="usage-bar-fill" style={{ width: `${pct(customer.limits.usageMembers, customer.limits.maxMembers)}%` }} /></div>
                                    <span className="usage-text">{customer.limits.usageMembers} / {customer.limits.maxMembers} đang dùng</span>
                                </div>
                            </div>
                        </div>

                        <div className="limit-card">
                            <div className="limit-card-icon"><Timer size={18} /></div>
                            <div className="limit-card-body">
                                <span className="limit-card-label">Phút họp trong chu kì</span>
                                <div className="limit-card-values">
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{customer.limits.meetingMinutesInCycle}</span>
                                    <span className="limit-unit">phút</span>
                                </div>
                                <div className="limit-card-usage">
                                    <div className="usage-bar"><div className="usage-bar-fill" style={{ width: `${pct(customer.limits.usageMinutesInCycle, customer.limits.meetingMinutesInCycle)}%` }} /></div>
                                    <span className="usage-text">{customer.limits.usageMinutesInCycle} / {customer.limits.meetingMinutesInCycle} đã dùng</span>
                                </div>
                            </div>
                        </div>

                        <div className="limit-card">
                            <div className="limit-card-icon"><Timer size={18} /></div>
                            <div className="limit-card-body">
                                <span className="limit-card-label">Phút họp ngoài chu kì</span>
                                <div className="limit-card-values">
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{customer.limits.meetingMinutesOutCycle}</span>
                                    <span className="limit-unit">phút</span>
                                </div>
                                <div className="limit-card-usage">
                                    <div className="usage-bar"><div className="usage-bar-fill" style={{ width: `${pct(customer.limits.usageMinutesOutCycle, customer.limits.meetingMinutesOutCycle)}%` }} /></div>
                                    <span className="usage-text">{customer.limits.usageMinutesOutCycle} / {customer.limits.meetingMinutesOutCycle} đã dùng</span>
                                </div>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="limit-card">
                            <div className="limit-card-icon"><HardDrive size={18} /></div>
                            <div className="limit-card-body">
                                <span className="limit-card-label">Dung lượng lưu trữ</span>
                                <div className="limit-card-values">
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{customer.limits.storageLimit}</span>
                                    <span className="limit-unit">GB</span>
                                </div>
                                <div className="limit-card-usage">
                                    <div className="usage-bar"><div className="usage-bar-fill" style={{ width: `${pct(customer.limits.usageStorage, customer.limits.storageLimit)}%` }} /></div>
                                    <span className="usage-text">{customer.limits.usageStorage} / {customer.limits.storageLimit} GB đã dùng</span>
                                </div>
                            </div>
                        </div>

                        <div className="limit-card">
                            <div className="limit-card-icon"><Video size={18} /></div>
                            <div className="limit-card-body">
                                <span className="limit-card-label">Số cuộc họp / ngày</span>
                                <div className="limit-card-values">
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{customer.limits.maxMeetingsPerDay}</span>
                                </div>
                                <div className="limit-card-usage">
                                    <div className="usage-bar"><div className="usage-bar-fill" style={{ width: `${pct(customer.limits.usageMeetingsToday, customer.limits.maxMeetingsPerDay)}%` }} /></div>
                                    <span className="usage-text">{customer.limits.usageMeetingsToday} / {customer.limits.maxMeetingsPerDay} hôm nay</span>
                                </div>
                            </div>
                        </div>

                        <div className="limit-card">
                            <div className="limit-card-icon"><Clock size={18} /></div>
                            <div className="limit-card-body">
                                <span className="limit-card-label">Phút họp / cuộc họp</span>
                                <div className="limit-card-values">
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{customer.limits.maxMinutesPerMeeting}</span>
                                    <span className="limit-unit">phút</span>
                                </div>
                                <div className="limit-card-usage">
                                    <span className="usage-text">Trung bình {customer.limits.usageAvgMinutes} phút / cuộc họp</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Invoice History (read-only) ===== */}
                <section className="detail-section">
                    <h2 className="detail-section-title">
                        <FileText size={20} /> Lịch sử hoá đơn
                        <span className="readonly-badge">Chỉ xem</span>
                    </h2>
                    <div className="data-table-wrapper">
                        <table className="data-table">
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
                                        <td><span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{inv.id}</span></td>
                                        <td><div className="cell-date"><Calendar size={14} />{inv.date}</div></td>
                                        <td><span className="plan-tag">{inv.plan}</span></td>
                                        <td style={{ fontWeight: 600 }}>{inv.amount}</td>
                                        <td className="cell-email">{inv.method}</td>
                                        <td>
                                            <span className={`status-badge ${inv.status === 'paid' ? 'active' : 'pending'}`}>
                                                {inv.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                            </span>
                                        </td>
                                        <td><button className="action-btn" title="Tải hoá đơn"><Download size={18} /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>

            {/* ===== Quota Modal ===== */}
            {selectedPlan && (
                <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3><Package size={20} /> Chi tiết Quota: {selectedPlan.name}</h3>
                            <button className="close-btn" onClick={() => setSelectedPlan(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="quota-grid">
                                {/* Members */}
                                <div className="quota-item">
                                    <span className="quota-label">Nhân sự</span>
                                    <div className="quota-value-row">
                                        <span className="quota-value-used">{customer.limits.usageMembers}</span>
                                        <span className="quota-value-total">/ {selectedPlan.quotas?.maxMembers || '--'}</span>
                                        <span className="quota-unit">nhân viên</span>
                                    </div>
                                    <div className="modal-usage-container">
                                        <div className="modal-usage-bar">
                                            <div className="modal-usage-fill" style={{ width: `${pct(customer.limits.usageMembers, selectedPlan.quotas?.maxMembers)}%` }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Meeting Minutes In Cycle */}
                                <div className="quota-item">
                                    <span className="quota-label">Phút họp (chu kì)</span>
                                    <div className="quota-value-row">
                                        <span className="quota-value-used">{customer.limits.usageMinutesInCycle}</span>
                                        <span className="quota-value-total">/ {selectedPlan.quotas?.meetingMinutesInCycle || '--'}</span>
                                        <span className="quota-unit">phút</span>
                                    </div>
                                    <div className="modal-usage-container">
                                        <div className="modal-usage-bar">
                                            <div className="modal-usage-fill" style={{ width: `${pct(customer.limits.usageMinutesInCycle, selectedPlan.quotas?.meetingMinutesInCycle)}%` }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Meeting Minutes Out of Cycle */}
                                <div className="quota-item">
                                    <span className="quota-label">Phút họp (ngoài chu kì)</span>
                                    <div className="quota-value-row">
                                        <span className="quota-value-used">{customer.limits.usageMinutesOutCycle}</span>
                                        <span className="quota-value-total">/ {selectedPlan.quotas?.meetingMinutesOutCycle || '--'}</span>
                                        <span className="quota-unit">phút</span>
                                    </div>
                                    <div className="modal-usage-container">
                                        <div className="modal-usage-bar">
                                            <div className="modal-usage-fill" style={{ width: `${pct(customer.limits.usageMinutesOutCycle, selectedPlan.quotas?.meetingMinutesOutCycle)}%` }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Storage */}
                                <div className="quota-item">
                                    <span className="quota-label">Lưu trữ</span>
                                    <div className="quota-value-row">
                                        <span className="quota-value-used">{customer.limits.usageStorage}</span>
                                        <span className="quota-value-total">/ {selectedPlan.quotas?.storageLimit || '--'}</span>
                                        <span className="quota-unit">GB</span>
                                    </div>
                                    <div className="modal-usage-container">
                                        <div className="modal-usage-bar">
                                            <div className="modal-usage-fill" style={{ width: `${pct(customer.limits.usageStorage, selectedPlan.quotas?.storageLimit)}%` }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Meetings Per Day */}
                                <div className="quota-item">
                                    <span className="quota-label">Cuộc họp / ngày</span>
                                    <div className="quota-value-row">
                                        <span className="quota-value-used">{customer.limits.usageMeetingsToday}</span>
                                        <span className="quota-value-total">/ {selectedPlan.quotas?.maxMeetingsPerDay || '--'}</span>
                                    </div>
                                    <div className="modal-usage-container">
                                        <div className="modal-usage-bar">
                                            <div className="modal-usage-fill" style={{ width: `${pct(customer.limits.usageMeetingsToday, selectedPlan.quotas?.maxMeetingsPerDay)}%` }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Max Minutes Per Meeting (No real 'current usage' bar here, just info) */}
                                <div className="quota-item">
                                    <span className="quota-label">Giới hạn phút / cuộc họp</span>
                                    <div className="quota-value-row">
                                        <span className="quota-value-used">{selectedPlan.quotas?.maxMinutesPerMeeting || '--'}</span>
                                        <span className="quota-unit">phút</span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                                        Quota tối đa cho mỗi phiên họp
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
