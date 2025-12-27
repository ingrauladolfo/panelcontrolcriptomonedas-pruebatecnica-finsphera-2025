import { DashboardCryptoCurrencies, DashboardCryptoCurrencyDetails, DashboardHome, Login } from "@/pages";

export const pagesMap: Record<string, () => Promise<{ default: any }>> = {
    '/': () => Promise.resolve({ default: Login }),
    '/login': () => Promise.resolve({ default: Login }),
    '/inicio-sesion': () => Promise.resolve({ default: Login }),
    '/dashboard/home': () => Promise.resolve({ default: DashboardHome }),
    '/dashboard/inicio': () => Promise.resolve({ default: DashboardHome }),
    '/dashboard/cryptocurrencies': () => Promise.resolve({ default: DashboardCryptoCurrencies }),
    '/dashboard/criptomonedas': () => Promise.resolve({ default: DashboardCryptoCurrencies }),
    '/dashboard/criptomoneda': () => Promise.resolve({ default: DashboardCryptoCurrencyDetails }),
    '/dashboard/cryptocurrency': () => Promise.resolve({ default: DashboardCryptoCurrencyDetails })
};