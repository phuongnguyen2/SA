/**
 * Module-level singleton store for service packs.
 * Allows ServicePacksPage and ServicePackCreatePage to share state
 * across React renders without a full state management library.
 */

let packs = [
    { id: 1, name: 'Free', code: 'FREE', price: '0 VND', priceNum: 0, credits: 300, status: 'active', subscribers: 42, createdAt: '01/01/2026, 00:00' },
    { id: 2, name: 'Free Bonus', code: 'FREE_BONUS', price: '0 VND', priceNum: 0, credits: 500, status: 'active', subscribers: 8, createdAt: '01/01/2026, 00:00' },
    { id: 3, name: 'Starter', code: 'STARTER', price: '99.000 VND', priceNum: 99000, credits: 1300, status: 'active', subscribers: 15, createdAt: '15/01/2026, 10:30' },
    { id: 4, name: 'Professional', code: 'PRO', price: '299.000 VND', priceNum: 299000, credits: 3000, status: 'active', subscribers: 7, createdAt: '15/01/2026, 10:30' },
    { id: 5, name: 'Enterprise', code: 'ENT', price: '999.000 VND', priceNum: 999000, credits: 10000, status: 'active', subscribers: 3, createdAt: '15/01/2026, 10:30' },
    { id: 6, name: 'Trial 30 Days', code: 'TRIAL30', price: '0 VND', priceNum: 0, credits: 1000, status: 'inactive', subscribers: 0, createdAt: '20/01/2026, 08:00' },
]

let listeners = []
let nextId = 7

export const servicePackStore = {
    getPacks: () => packs,

    addPack: (newPack) => {
        const now = new Date()
        const pad = (n) => String(n).padStart(2, '0')
        const createdAt = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}, ${pad(now.getHours())}:${pad(now.getMinutes())}`
        const priceNum = Number(newPack.priceNum) || 0
        const priceStr = priceNum > 0
            ? priceNum.toLocaleString('vi-VN') + ' VND'
            : '0 VND'

        const entry = {
            id: nextId++,
            name: newPack.name || 'Gói mới',
            code: newPack.code || `PACK${nextId}`,
            price: priceStr,
            priceNum,
            credits: Number(newPack.credits) || 0,
            status: newPack.status || 'active',
            subscribers: 0,
            createdAt,
        }
        packs = [...packs, entry]
        listeners.forEach(cb => cb(packs))
        return entry
    },

    subscribe: (cb) => {
        listeners.push(cb)
        return () => { listeners = listeners.filter(l => l !== cb) }
    },
}
