// Sidebar.tsx
import '@/common/styles/components/Navbar/index.css';
import type { FC, JSX } from 'react';
import { FaX } from 'react-icons/fa6';
import { useLayoutEffect } from 'react';
import { useUIStore } from '@/common/stores';
import { useLanguage } from '@/common/context';
import { FaCoins, FaHome, FaUsers } from 'react-icons/fa';

export const Sidebar: FC = () => {
    const { sidebarOpen, setSidebarOpen, titles, loadTitles } = useUIStore();
    const { lang } = useLanguage()
    const icons: Record<string, JSX.Element> = {
        Inicio: <FaHome />,
        Usuarios: <FaUsers />,
        Criptomonedas: <FaCoins />,
        Home: <FaHome />,
        Users: <FaUsers />,
        Cryptocurrencies: <FaCoins />,
    };
    useLayoutEffect(() => {
        loadTitles(lang);
    }, [loadTitles, lang]);

    return (
        <aside className={`fixed top-0 left-0 w-[80%] max-w-70 h-screen bg-[#1A1D23] transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-lg z-50`}>
            <div className="p-4">
                <button className="bg-none border-none text-[24px] cursor-pointer text-white" onClick={() => setSidebarOpen(false)}>
                    <FaX />
                </button>
                <nav>
                    <ul>
                        {titles.map((item: any, index: any) => (

                            <li key={index} className="py-2.5 px-0 border-b border-[#e6e6e6] list-none">
                                <a href={item.path} className="no-underline text-white font-medium hover:text-[#666]">
                                    <span className="mr-2.5 text-lg align-middle">
                                        {icons[item.title] && <span className="inline-flex items-center justify-center text-2xl opacity-[0.98] size-[1.4em]">{icons[item.title]}</span>}
                                    </span>
                                    {item.title}
                                </a>
                            </li>

                        ))}
                    </ul>
                </nav>
            </div>

        </aside>
    );
};