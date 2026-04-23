import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { ChevronLeft, Package, Save, Coins, Tag, CheckCircle } from 'lucide-react'
import { servicePackStore } from '../store/servicePackStore'
import './OrderCreatePage.css'

export default function ServicePackCreatePage() {
    const navigate = useNavigate()
    const [saved, setSaved] = useState(false)
    const [form, setForm] = useState({
        name: '',
        code: '',
        priceNum: 0,
        credits: 0,
        status: 'active',
    })
    const [errors, setErrors] = useState({})

    const update = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
    }

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Tên gói không được để trống'
        if (!form.code.trim()) e.code = 'Mã gói không được để trống'
        if (Number(form.credits) < 0) e.credits = 'Credits phải >= 0'
        return e
    }

    const handleSave = () => {
        const e = validate()
        if (Object.keys(e).length > 0) { setErrors(e); return }

        servicePackStore.addPack({
            name: form.name.trim(),
            code: form.code.trim().toUpperCase(),
            priceNum: Number(form.priceNum),
            credits: Number(form.credits),
            status: form.status,
        })

        setSaved(true)
        setTimeout(() => navigate('/service-packs'), 800)
    }

    return (
        <>
            <Header />
            <div className="page-body fade-in">
                <div className="order-create-container">
                    <Link to="/service-packs" className="back-link mb-20">
                        <ChevronLeft size={18} /> Quay lại danh sách gói dịch vụ
                    </Link>

                    <div className="order-create-header">
                        <div className="order-header-left">
                            <div className="order-icon-wrapper">
                                <Package size={32} />
                            </div>
                            <div className="order-header-info">
                                <h1>Tạo gói dịch vụ mới</h1>
                                <p className="text-muted">Nhập thông tin để thêm gói dịch vụ vào hệ thống</p>
                            </div>
                        </div>
                        <div className="action-btn-group">
                            <button className={`save-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
                                {saved ? <CheckCircle size={18} /> : <Save size={18} />}
                                {saved ? 'Đã lưu!' : 'Lưu gói'}
                            </button>
                        </div>
                    </div>

                    <div className="order-main-layout">
                        <div className="order-left-col">
                            <div className="order-card">
                                <h3 className="card-title"><Tag size={20} /> Thông tin gói</h3>
                                <div className="compact-form-grid">

                                    {/* Tên gói */}
                                    <div className="form-item span-2">
                                        <label className="info-label">Tên gói <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                                        <input
                                            className={`edit-input ${errors.name ? 'input-error' : ''}`}
                                            placeholder="VD: Professional Plus"
                                            value={form.name}
                                            onChange={e => update('name', e.target.value)}
                                        />
                                        {errors.name && <span className="field-error">{errors.name}</span>}
                                    </div>

                                    {/* Mã gói */}
                                    <div className="form-item">
                                        <label className="info-label">Mã gói <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                                        <input
                                            className={`edit-input ${errors.code ? 'input-error' : ''}`}
                                            placeholder="VD: PRO_PLUS"
                                            value={form.code}
                                            onChange={e => update('code', e.target.value.toUpperCase())}
                                        />
                                        {errors.code && <span className="field-error">{errors.code}</span>}
                                    </div>

                                    {/* Trạng thái */}
                                    <div className="form-item span-3"></div> {/* spacer */}

                                    <div className="form-item">
                                        <label className="info-label">Trạng thái</label>
                                        <select
                                            className="edit-select create-status-select"
                                            value={form.status}
                                            onChange={e => update('status', e.target.value)}
                                        >
                                            <option value="active">Hoạt động</option>
                                            <option value="inactive">Ngừng</option>
                                        </select>
                                    </div>

                                    {/* Giá gói */}
                                    <div className="form-item">
                                        <label className="info-label">Giá gói (VND)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="edit-input"
                                            placeholder="0 = Miễn phí"
                                            value={form.priceNum}
                                            onChange={e => update('priceNum', e.target.value)}
                                        />
                                    </div>

                                    {/* Credits */}
                                    <div className="form-item">
                                        <label className="info-label">
                                            <Coins size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                                            Số credits <span style={{ color: 'var(--color-danger)' }}>*</span>
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            className={`edit-input ${errors.credits ? 'input-error' : ''}`}
                                            placeholder="VD: 1000"
                                            value={form.credits}
                                            onChange={e => update('credits', e.target.value)}
                                        />
                                        {errors.credits && <span className="field-error">{errors.credits}</span>}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Right Column: Preview */}
                        <div className="order-right-col">
                            <div className="order-card" style={{ padding: '24px' }}>
                                <h3 className="card-title" style={{ marginTop: 0, borderBottom: 'none', paddingBottom: 0 }}>Xem trước</h3>
                                <p className="text-muted" style={{ marginTop: 0, marginBottom: 20 }}>Giao diện hiển thị của gói</p>

                                <div style={{
                                    padding: '24px',
                                    background: 'var(--color-primary-bg)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--color-primary)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 16,
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: 4 }}>{form.name || 'Tên Gói Dịch Vụ'}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{form.code || 'MÃ_GÓI'}</div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Giá gói</span>
                                            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)' }}>
                                                {Number(form.priceNum) > 0 ? Number(form.priceNum).toLocaleString('vi-VN') + ' đ' : 'Miễn phí'}
                                            </span>
                                        </div>
                                        <div style={{ height: 1, background: 'var(--color-border)' }}></div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Số lượng Credit</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '1.05rem', fontWeight: 700, color: '#F5A623' }}>
                                                <Coins size={18} />
                                                {Number(form.credits || 0).toLocaleString()} <span style={{ fontSize: '0.85rem' }}>CR</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 8 }}>
                                        <span className={`status-badge ${form.status}`} style={{ display: 'inline-block' }}>
                                            {form.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .input-error { border-color: var(--color-danger) !important; }
                .field-error { color: var(--color-danger); font-size: 0.78rem; margin-top: 2px; display: block; }
                .save-btn.saved { background: var(--color-success) !important; }
            `}</style>
        </>
    )
}
