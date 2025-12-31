import { create } from 'zustand';
import { FaHome, FaUsers } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { pathToTitle } from '@/assets/data';

type UIState = {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
    titles: { path: string; title: string; icon?: IconType }[];
    loadTitles: (lang: string) => void;
};

export const useUIStore = create<UIState>((set, get) => ({
    sidebarOpen: false,
    setSidebarOpen: (value) => set({ sidebarOpen: value }),
    titles: [],
    loadTitles: (lang: string) => {
        const currentTitles = get().titles;
        if (currentTitles.length > 0) {
            // Si ya hay títulos cargados, no hacer nada
            return;
        }

        // Solo aceptar rutas exactas cuya UI quieres mostrar
        const allowed = ['/dashboard/home', '/dashboard/users', '/dashboard/inicio', '/dashboard/usuarios', '/dashboard/criptomonedas', '/dashboard/cryptocurrencies', '/dashboard/mapas-calor', '/dashboard/heatmaps'];

        const dashboardButtons = pathToTitle.filter((item) =>
            allowed.includes(item.path[lang as keyof typeof item.path])
        );

        const formattedButtons = dashboardButtons.map((item) => {
            // tomar la parte antes de '|' y luego lo que sigue a 'Dashboard -'
            const beforePipe = (item.title[lang as keyof typeof item.title] ?? '').split('|')[0].trim();
            const title =
                beforePipe.includes('Dashboard -')
                    ? beforePipe.split('Dashboard -')[1].trim()
                    : beforePipe;

            let icon: IconType | undefined;
            if (item.path[lang as keyof typeof item.path] === '/dashboard/home') icon = FaHome;
            if (item.path[lang as keyof typeof item.path] === '/dashboard/users') icon = FaUsers;

            return { path: item.path[lang as keyof typeof item.path], title, icon };
        });

        set({ titles: formattedButtons });
    },
}));