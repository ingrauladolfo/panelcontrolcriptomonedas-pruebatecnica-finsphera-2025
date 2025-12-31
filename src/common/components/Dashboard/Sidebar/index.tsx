import { FaX } from 'react-icons/fa6'
import { useLayoutEffect, useMemo, type FC } from 'react'
import { useUIStore } from '@/common/stores'
import { useLanguage } from '@/common/context'
import { Button } from '../../shared/Button'
import { icons } from '@/assets/data'

export const Sidebar: FC = () => {
    const { sidebarOpen, setSidebarOpen, titles = [], loadTitles } = useUIStore()
    const { lang } = useLanguage()

    useLayoutEffect(() => {
        loadTitles(lang)
    }, [loadTitles, lang])

    // dedupe by path (preferred) or title
    const uniqueTitles = useMemo(() => {
        const map = new Map<string, any>()
        for (const t of titles) {
            const key = (t?.path && String(t.path)) || (t?.title && String(t.title)) || JSON.stringify(t)
            if (!map.has(key)) map.set(key, t)
        }
        return Array.from(map.values())
    }, [titles])

    return (
        <aside
            className={`fixed top-0 left-0 w-[80%] max-w-70 h-screen bg-[#1A1D23] transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } shadow-lg z-50`}
        >
            <div className="p-4">
                <Button
                    className="bg-none border-none text-[24px] cursor-pointer text-white"
                    onClick={() => setSidebarOpen(false)}
                >
                    <FaX className="size-6" />
                </Button>

                <nav>
                    <ul>
                        {uniqueTitles.map((item: any) => {
                            const key = item?.path ?? item?.title ?? JSON.stringify(item)
                            const iconEl = (item?.title && icons[item.title]) ?? null

                            return (
                                <li key={key} className="py-2.5 px-0 border-b border-[#e6e6e6] list-none">
                                    <a href={item.path} className="no-underline text-white font-medium hover:text-[#666] flex items-center gap-3">
                                        <span className="mr-2.5 text-lg align-middle">
                                            {iconEl && <span className="inline-flex items-center justify-center text-2xl opacity-[0.98]">{iconEl}</span>}
                                        </span>
                                        <span>{item.title}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}
