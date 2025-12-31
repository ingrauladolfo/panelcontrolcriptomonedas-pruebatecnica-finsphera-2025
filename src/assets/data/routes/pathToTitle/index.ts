/* This TypeScript code snippet is defining an array named `pathToTitle` of type `PathToTitle[]`. Each
element in the array is an object with `path` and `title` properties, where `path` is an object
containing paths in different languages (Spanish and English) and `title` is an object containing
titles in different languages. */
import type { PathToTitle } from "@/common/interfaces";

export const pathToTitle: PathToTitle[] = [
    {
        path: { es: '/', en: '/' },
        title: { es: 'Inicio de sesión | Finsphera', en: 'Login | Finsphera' }
    },
    {
        path: { es: '/inicio-sesion', en: '/login' },
        title: { es: 'Inicio de sesión | Finsphera', en: 'Login | Finsphera' }
    },
    {
        path: { es: '/dashboard/inicio', en: '/dashboard/home' },
        title: { es: 'Dashboard - Inicio | Finsphera', en: 'Dashboard - Home | Finsphera' }
    },
    {
        path: { es: '/dashboard/usuarios', en: '/dashboard/users' },
        title: { es: 'Dashboard - Usuarios | Finsphera', en: 'Dashboard - Users | Finsphera' }
    },
    {
        path: { es: '/dashboard/criptomonedas', en: '/dashboard/cryptocurrencies' },
        title: { es: 'Dashboard - Criptomonedas | Finsphera', en: 'Dashboard - Cryptocurrencies | Finsphera' }
    },
    {
        path: { es: '/dashboard/mapas-calor', en: '/dashboard/heatmaps' },
        title: { es: 'Dashboard - Mapas de calor | Finsphera', en: 'Dashboard - Heatmaps | Finsphera' }
    },
    {
        path: { es: '/dashboard/usuario', en: '/dashboard/user' },
        title: { es: 'Dashboard - Usuario | Finsphera', en: 'Dashboard - User | Finsphera' }
    },
    {
        path: { es: '/dashboard/criptomoneda', en: '/dashboard/cryptocurrency' },
        title: { es: 'Dashboard - Criptomoneda | Finsphera', en: 'Dashboard - Cryptocurrency | Finsphera' }
    },
    {
        path: { es: '/dashboard/grafica', en: '/dashboard/chart' },
        title: { es: 'Dashboard - Gráfica | Finsphera', en: 'Dashboard - Chart | Finsphera' }
    },
    {
        path: { es: '/dashboard/mapa-calor', en: '/dashboard/heatmap' },
        title: { es: 'Dashboard - Mapa de calor | Finsphera', en: 'Dashboard - Heatmap | Finsphera' }
    },

];