import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import {
    ArrowLeft, Package, Save, CheckCircle, AlertCircle,
    DollarSign, RotateCcw, Calendar, Lock, Trash2,
    Users, Timer, Clock, Video, HardDrive, Zap, ShieldCheck, Pencil, Crown
} from 'lucide-react'
import './ServicePackDetailPage.css'

/* ============================================================
   MOCK DATA
   ============================================================ */
const mockPacks = {
    1: {
        name: 'Free',
        type: 'main',        // main | addon
        price: 0,
        currency: 'VND',
        resetCycle: 1,             // tháng
        validityPeriod: 12,        // tháng
        lockAfterDays: 30,         // ngày
        deleteDbAfterDays: 90,     // ngày
        maxMembers: 5,
        meetingMinutesPerCycle: 300,
        meetingMinutesOutCycle: 30,
        meetingsPerDay: 3,
        minutesPerMeeting: 45,
        storageLimit: 2,           // GB
        aiPriority: 'normal',      // highest | high | normal
        priority: 3,               // 1: cao nhất, lower is higher priority
        businessActive: true,
    },
    2: {
        name: 'Free Bonus',
        type: 'addon',
        price: 0,
        currency: 'VND',
        resetCycle: 1,
        validityPeriod: 3,
        lockAfterDays: 15,
        deleteDbAfterDays: 60,
        maxMembers: 10,
        meetingMinutesPerCycle: 500,
        meetingMinutesOutCycle: 50,
        meetingsPerDay: 5,
        minutesPerMeeting: 60,
        storageLimit: 5,
        aiPriority: 'normal',
        priority: 3,
        businessActive: true,
    },
    3: {
        name: 'Starter',
        type: 'main',
        price: 99000,
        currency: 'VND',
        resetCycle: 1,
        validityPeriod: 12,
        lockAfterDays: 30,
        deleteDbAfterDays: 90,
        maxMembers: 20,
        meetingMinutesPerCycle: 1300,
        meetingMinutesOutCycle: 130,
        meetingsPerDay: 15,
        minutesPerMeeting: 120,
        storageLimit: 20,
        aiPriority: 'high',
        businessActive: true,
    },
    4: {
        name: 'Professional',
        type: 'main',
        price: 299000,
        currency: 'VND',
        resetCycle: 1,
        validityPeriod: 12,
        lockAfterDays: 60,
        deleteDbAfterDays: 180,
        maxMembers: 50,
        meetingMinutesPerCycle: 3000,
        meetingMinutesOutCycle: 300,
        meetingsPerDay: 30,
        minutesPerMeeting: 180,
        storageLimit: 50,
        aiPriority: 'high',
        businessActive: true,
    },
    5: {
        name: 'Enterprise',
        type: 'main',
        price: 999000,
        currency: 'VND',
        resetCycle: 1,
        validityPeriod: 12,
        lockAfterDays: 90,
        deleteDbAfterDays: 365,
        maxMembers: 200,
        meetingMinutesPerCycle: 10000,
        meetingMinutesOutCycle: 1000,
        meetingsPerDay: 100,
        minutesPerMeeting: 300,
        storageLimit: 200,
        aiPriority: 'highest',
        priority: 1,
        businessActive: true,
    },
    6: {
        name: 'Trial 30 Days',
        type: 'addon',
        price: 0,
        currency: 'VND',
        resetCycle: 1,
        validityPeriod: 1,
        lockAfterDays: 7,
        deleteDbAfterDays: 30,
        maxMembers: 50,
        meetingMinutesPerCycle: 1000,
        meetingMinutesOutCycle: 100,
        meetingsPerDay: 20,
        minutesPerMeeting: 120,
        storageLimit: 10,
        aiPriority: 'normal',
        priority: 3,
        businessActive: false,
    },
}

const defaultPack = {
    name: '',
    type: 'main',
    price: 0,
    currency: 'VND',
    resetCycle: 1,
    validityPeriod: 12,
    lockAfterDays: 30,
    deleteDbAfterDays: 90,
    maxMembers: 5,
    meetingMinutesPerCycle: 300,
    meetingMinutesOutCycle: 30,
    meetingsPerDay: 3,
    minutesPerMeeting: 45,
    storageLimit: 2,
    aiPriority: 'normal',
    priority: 3,
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

const typeOptions = [
    { value: 'main', label: 'Gói chính' },
    { value: 'addon', label: 'Gói phụ' },
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
                            <span className={`pack-type-badge ${pack.type === 'main' ? 'main' : 'addon'}`}>
                                <Package size={14} />
                                {pack.type === 'main' ? 'Gói chính' : 'Gói phụ'}
                            </span>
                            <span style={{ color: 'var(--color-text-muted)' }}>•</span>
                            <span style={{ fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.928rem' }}>
                                {formatPrice(pack.price)} {pack.currency}
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
                                <label><Package size={14} /> Phân loại gói</label>
                                <select
                                    className="sp-select"
                                    value={pack.type}
                                    onChange={e => updateField('type', e.target.value)}
                                    id="select-pack-type"
                                >
                                    {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
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
                            <div className="sp-field">
                                <label><RotateCcw size={14} /> Chu kỳ reset</label>
                                <div className="sp-input-unit">
                                    <input
                                        type="number"
                                        className="sp-input"
                                        value={pack.resetCycle}
                                        onChange={e => updateField('resetCycle', Number(e.target.value))}
                                        id="input-reset-cycle"
                                    />
                                    <span className="sp-input-suffix">tháng</span>
                                </div>
                            </div>
                            <div className="sp-field">
                                <label><Calendar size={14} /> Hạn sử dụng</label>
                                <div className="sp-input-unit">
                                    <input
                                        type="number"
                                        className="sp-input"
                                        value={pack.validityPeriod}
                                        onChange={e => updateField('validityPeriod', Number(e.target.value))}
                                        id="input-validity"
                                    />
                                    <span className="sp-input-suffix">tháng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Section 2: Chính sách hết hạn ===== */}
                <section className="detail-section">
                    <h2 className="detail-section-title"><Lock size={20} /> Chính sách hết hạn</h2>
                    <div className="sp-section-card">
                        <div className="sp-form-grid">
                            <div className="sp-field">
                                <label><Lock size={14} /> Khóa sau số ngày hết hạn</label>
                                <div className="sp-input-unit">
                                    <input
                                        type="number"
                                        className="sp-input"
                                        value={pack.lockAfterDays}
                                        onChange={e => updateField('lockAfterDays', Number(e.target.value))}
                                        id="input-lock-days"
                                    />
                                    <span className="sp-input-suffix">ngày</span>
                                </div>
                            </div>
                            <div className="sp-field">
                                <label><Trash2 size={14} /> Xóa DB sau số ngày hết hạn</label>
                                <div className="sp-input-unit">
                                    <input
                                        type="number"
                                        className="sp-input"
                                        value={pack.deleteDbAfterDays}
                                        onChange={e => updateField('deleteDbAfterDays', Number(e.target.value))}
                                        id="input-delete-db-days"
                                    />
                                    <span className="sp-input-suffix">ngày</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== Section 3: Giới hạn sử dụng ===== */}
                <section className="detail-section">
                    <h2 className="detail-section-title"><Timer size={20} /> Giới hạn sử dụng</h2>
                    <div className="sp-limits-grid">

                        {/* Giới hạn nhân sự */}
                        <div className="sp-limit-card">
                            <div className="sp-limit-icon purple"><Users size={20} /></div>
                            <div className="sp-limit-body">
                                <span className="sp-limit-label">Giới hạn nhân sự</span>
                                <div className="sp-limit-input-row">
                                    <input
                                        type="number"
                                        value={pack.maxMembers}
                                        onChange={e => updateField('maxMembers', Number(e.target.value))}
                                        id="input-max-members"
                                    />
                                    <span className="sp-limit-unit">người</span>
                                </div>
                            </div>
                        </div>

                        {/* Phút họp / chu kỳ */}
                        <div className="sp-limit-card">
                            <div className="sp-limit-icon blue"><Timer size={20} /></div>
                            <div className="sp-limit-body">
                                <span className="sp-limit-label">Phút họp / chu kỳ</span>
                                <div className="sp-limit-input-row">
                                    <input
                                        type="number"
                                        value={pack.meetingMinutesPerCycle}
                                        onChange={e => updateField('meetingMinutesPerCycle', Number(e.target.value))}
                                        id="input-minutes-in-cycle"
                                    />
                                    <span className="sp-limit-unit">phút</span>
                                </div>
                            </div>
                        </div>

                        {/* Phút họp ngoài chu kỳ */}
                        <div className="sp-limit-card">
                            <div className="sp-limit-icon orange"><Timer size={20} /></div>
                            <div className="sp-limit-body">
                                <span className="sp-limit-label">Phút họp ngoài chu kỳ</span>
                                <div className="sp-limit-input-row">
                                    <input
                                        type="number"
                                        value={pack.meetingMinutesOutCycle}
                                        onChange={e => updateField('meetingMinutesOutCycle', Number(e.target.value))}
                                        id="input-minutes-out-cycle"
                                    />
                                    <span className="sp-limit-unit">phút</span>
                                </div>
                            </div>
                        </div>

                        {/* Cuộc họp / ngày */}
                        <div className="sp-limit-card">
                            <div className="sp-limit-icon green"><Video size={20} /></div>
                            <div className="sp-limit-body">
                                <span className="sp-limit-label">Số cuộc họp / ngày</span>
                                <div className="sp-limit-input-row">
                                    <input
                                        type="number"
                                        value={pack.meetingsPerDay}
                                        onChange={e => updateField('meetingsPerDay', Number(e.target.value))}
                                        id="input-meetings-per-day"
                                    />
                                    <span className="sp-limit-unit">cuộc</span>
                                </div>
                            </div>
                        </div>

                        {/* Phút / cuộc họp */}
                        <div className="sp-limit-card">
                            <div className="sp-limit-icon red"><Clock size={20} /></div>
                            <div className="sp-limit-body">
                                <span className="sp-limit-label">Phút họp / cuộc họp</span>
                                <div className="sp-limit-input-row">
                                    <input
                                        type="number"
                                        value={pack.minutesPerMeeting}
                                        onChange={e => updateField('minutesPerMeeting', Number(e.target.value))}
                                        id="input-minutes-per-meeting"
                                    />
                                    <span className="sp-limit-unit">phút</span>
                                </div>
                            </div>
                        </div>

                        {/* Dung lượng lưu trữ */}
                        <div className="sp-limit-card">
                            <div className="sp-limit-icon purple"><HardDrive size={20} /></div>
                            <div className="sp-limit-body">
                                <span className="sp-limit-label">Dung lượng lưu trữ</span>
                                <div className="sp-limit-input-row">
                                    <input
                                        type="number"
                                        value={pack.storageLimit}
                                        onChange={e => updateField('storageLimit', Number(e.target.value))}
                                        id="input-storage-limit"
                                    />
                                    <span className="sp-limit-unit">GB</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ===== Section 4: AI Priority & Business Status ===== */}
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
                        <div className="ai-card">
                            <div className="ai-card-icon"><Crown size={24} /></div>
                            <div className="ai-card-body">
                                <label>Ưu tiên trừ Quota</label>
                                <div className="sp-input-unit">
                                    <input
                                        type="number"
                                        className="sp-input"
                                        value={pack.priority}
                                        onChange={e => updateField('priority', Number(e.target.value))}
                                        id="input-quota-priority"
                                        min="1"
                                    />
                                    <span className="sp-input-suffix">(Số càng nhỏ ưu tiên càng cao)</span>
                                </div>
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
