import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import {
    ArrowLeft, Package, Save, CheckCircle, AlertCircle,
    DollarSign, Calendar,
    Zap, ShieldCheck, Pencil, Coins
} from 'lucide-react'
import './ServicePackDetailPage.css'

/* ============================================================
   MOCK DATA
   ============================================================ */
const mockPacks = {
    1: {
        name: 'Free',
        price: 0,
        currency: 'VND',
        validityPeriod: 12,
        credits: 300,
        aiPriority: 'normal',
        businessActive: true,
    },
    2: {
        name: 'Free Bonus',
        price: 0,
        currency: 'VND',
        validityPeriod: 3,
        credits: 500,
        aiPriority: 'normal',
        businessActive: true,
    },
    3: {
        name: 'Starter',
        price: 99000,
        currency: 'VND',
        validityPeriod: 12,
        credits: 1300,
        aiPriority: 'high',
        businessActive: true,
    },
    4: {
        name: 'Professional',
        price: 299000,
        currency: 'VND',
        validityPeriod: 12,
        credits: 3000,
        aiPriority: 'high',
        businessActive: true,
    },
    5: {
        name: 'Enterprise',
        price: 999000,
        currency: 'VND',
        validityPeriod: 12,
        credits: 10000,
        aiPriority: 'highest',
        businessActive: true,
    },
    6: {
        name: 'Trial 30 Days',
        price: 0,
        currency: 'VND',
        validityPeriod: 1,
        credits: 1000,
        aiPriority: 'normal',
        businessActive: false,
    },
}

const defaultPack = {
    name: '',
    price: 0,
    currency: 'VND',
    validityPeriod: 12,
    credits: 300,
    aiPriority: 'normal',
    businessActive: true,
}

const aiPriorityOptions = [
    { value: 'highest', label: 'Cao nhất' },
    { value: 'high', label: 'Cao' },
    { value: 'normal', label: 'Bình thường' },
]

const currencyOptions = [
    { value: 'VND', label: 'VND' },
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
]

/* ============================================================
   COMPONENT
   ============================================================ */
export default function ServicePackDetailPage() {
    const { id } = useParams()
    const isNew = id === 'new'
    const initial = isNew ? defaultPack : mockPacks[id]

    const [pack, setPack] = useState(initial ? { ...initial } : null)
    const [saved, setSaved] = useState(false)

    if (!pack) {
        return (
            <>
                <Header />
                <div className="page-body fade-in">
                    <div className="empty-state">
                        <AlertCircle />
                        <p>Không tìm thấy gói dịch vụ</p>
                        <Link to="/service-packs" className="back-link" style={{ marginTop: 16 }}>
                            <ArrowLeft size={16} /> Quay lại danh sách
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    /* --- helpers --- */
    const updateField = (field, value) => {
        setPack(prev => ({ ...prev, [field]: value }))
        setSaved(false)
    }
    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2500)
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price)
    }

    return (
        <>
            <Header />
            <div className="page-body fade-in">

                {/* ===== Top bar ===== */}
                <div className="detail-top-bar">
                    <Link to="/service-packs" className="back-link" id="btn-back-packs">
                        <ArrowLeft size={16} /> Quay lại danh sách gói dịch vụ
                    </Link>
                    <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={handleSave} id="btn-save-pack">
                        {saved ? <CheckCircle size={16} /> : <Save size={16} />}
                        {saved ? 'Đã lưu!' : (isNew ? 'Tạo gói mới' : 'Lưu thay đổi')}
                    </button>
                </div>

                {/* ===== Pack Header ===== */}
                <div className="pack-detail-header">
                    <div className="pack-header-icon">
                        <Package size={32} />
                    </div>
                    <div className="pack-header-body">
                        <div className="editable-row">
                            <input
                                className="pack-header-name"
                                value={pack.name}
                                placeholder={isNew ? 'Nhập tên gói dịch vụ...' : ''}
                                onChange={e => updateField('name', e.target.value)}
                                id="input-pack-name-header"
                            />
                            <Pencil size={14} className="edit-hint" />
                        </div>
                        <div className="pack-header-meta">
                            <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.928rem' }}>
                                {formatPrice(pack.price)} {pack.currency}
                            </span>
                            <span style={{ color: 'var(--color-text-muted)' }}>•</span>
                            <span className="plan-credit-badge">
                                <Coins size={14} /> {pack.credits.toLocaleString()} credits
                            </span>
                        </div>
                    </div>
                    <div className="pack-header-actions">
                        <span className={`toggle-status ${pack.businessActive ? 'active' : 'inactive'}`}>
                            {pack.businessActive ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}
                        </span>
                    </div>
                </div>

                {/* ===== Section 1: Thông tin cơ bản ===== */}
                <section className="detail-section">
                    <h2 className="detail-section-title"><Package size={20} /> Thông tin cơ bản</h2>
                    <div className="sp-section-card">
                        <div className="sp-form-grid three-cols">
                            <div className="sp-field">
                                <label><Package size={14} /> Tên gói</label>
                                <input
                                    className="sp-input"
                                    value={pack.name}
                                    onChange={e => updateField('name', e.target.value)}
                                    id="input-pack-name"
                                />
                            </div>
                            <div className="sp-field">
                                <label><DollarSign size={14} /> Giá gói</label>
                                <input
                                    type="number"
                                    className="sp-input"
                                    value={pack.price}
                                    onChange={e => updateField('price', Number(e.target.value))}
                                    id="input-pack-price"
                                />
                            </div>
                            <div className="sp-field">
                                <label><DollarSign size={14} /> Đơn vị tiền tệ</label>
                                <select
                                    className="sp-select"
                                    value={pack.currency}
                                    onChange={e => updateField('currency', e.target.value)}
                                    id="select-currency"
                                >
                                    {currencyOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Section 2: Credit ===== */}
                <section className="detail-section">
                    <h2 className="detail-section-title"><Coins size={20} /> Credit</h2>
                    <div className="sp-limits-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="sp-limit-card">
                            <div className="sp-limit-icon blue"><Coins size={20} /></div>
                            <div className="sp-limit-body">
                                <span className="sp-limit-label">Số lượng Credit</span>
                                <div className="sp-limit-input-row">
                                    <input
                                        type="number"
                                        value={pack.credits}
                                        onChange={e => updateField('credits', Number(e.target.value))}
                                        id="input-credits"
                                    />
                                    <span className="sp-limit-unit">credits</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Section 3: AI Priority & Business Status ===== */}
                <section className="detail-section">
                    <h2 className="detail-section-title"><Zap size={20} /> Ưu tiên & Trạng thái</h2>
                    <div className="ai-priority-section">
                        <div className="ai-card">
                            <div className="ai-card-icon"><Zap size={24} /></div>
                            <div className="ai-card-body">
                                <label>Ưu tiên xử lý AI</label>
                                <select
                                    className="sp-select"
                                    value={pack.aiPriority}
                                    onChange={e => updateField('aiPriority', e.target.value)}
                                    id="select-ai-priority"
                                >
                                    {aiPriorityOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="business-status-card">
                            <div className={`business-status-icon ${pack.businessActive ? 'active' : 'inactive'}`}>
                                <ShieldCheck size={24} />
                            </div>
                            <div className="business-status-body">
                                <span className="business-status-label">Trạng thái kinh doanh</span>
                                <label className="toggle-label">
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={pack.businessActive}
                                            onChange={e => updateField('businessActive', e.target.checked)}
                                            id="toggle-business-status-bottom"
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                    <span className={`toggle-status ${pack.businessActive ? 'active' : 'inactive'}`}>
                                        {pack.businessActive ? 'Yes' : 'No'}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}
