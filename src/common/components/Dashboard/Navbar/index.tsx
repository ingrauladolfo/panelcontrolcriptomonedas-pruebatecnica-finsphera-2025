// Navbar.tsx
import { useLayoutEffect, type FC } from 'react'
import { Sidebar } from '../Sidebar'
import { UserProfile } from '../UserProfile'
import { useUIStore, useUserStore } from '@/common/stores'
import { MdMenu } from 'react-icons/md'
import { useLanguage } from '@/common/context'
import { MX, US } from 'country-flag-icons/react/3x2'

export const Navbar: FC = () => {
    const { sidebarOpen, setSidebarOpen, loadTitles } = useUIStore()
    const { lang, toggleLang } = useLanguage()
    const user = useUserStore(s => s.user)
    const loadFromStorage = useUserStore(s => s.loadFromStorage)

    // derive initials from user so it updates when `user` is set
    const initials = useUserStore(s => {
        const u = s.user
        if (!u) return null
        const f = String(u.name?.first ?? '').trim()
        const l = String(u.name?.last ?? '').trim()
        return `${(f[0] ?? '')}${(l[0] ?? '')}`.toUpperCase()
    })

    const showLogoutModal = useUserStore(s => s.showLogoutModal)
    const openLogoutModal = useUserStore(s => s.openLogoutModal)
    const closeLogoutModal = useUserStore(s => s.closeLogoutModal)
    const confirmLogout = useUserStore(s => s.confirmLogout)

    // hydrate user once on mount so initials are available immediately after mount
    useLayoutEffect(() => {
        loadFromStorage()
        loadTitles(lang);
    }, [loadFromStorage, loadTitles, lang])

    return (
        <header className="h-14 flex items-center justify-between px-4 py-2 bg-inherit border-b border-gray-200 text-white">
            <div className="flex items-center gap-3">
                <button
                    className="text-xl bg-none border-none cursor-pointer text-white"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <MdMenu />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={toggleLang} aria-label="Toggle language" className="p-2 rounded hover:bg-gray-700 w-10 h-10 flex items-center justify-center">
                    {lang === 'es' ? <MX className="w-6 h-6" /> : <US className="w-6 h-6" />}
                </button>
                <UserProfile
                    user={user}
                    initials={initials}
                    loadFromStorage={loadFromStorage}
                    showLogoutModal={showLogoutModal}
                    openLogoutModal={openLogoutModal}
                    closeLogoutModal={closeLogoutModal}
                    confirmLogout={confirmLogout}
                    confirmText="Aceptar"
                    cancelText="Cancelar"
                />

            </div>

            <Sidebar />
        </header>
    )
}