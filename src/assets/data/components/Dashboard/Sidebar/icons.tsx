import type { JSX } from 'react'
import { FaCoins, FaHome, FaUsers } from 'react-icons/fa'
import { FcHeatMap } from 'react-icons/fc'

export const icons: Record<string, JSX.Element> = {
    Inicio: <FaHome />,
    Usuarios: <FaUsers />,
    Criptomonedas: <FaCoins />,
    Home: <FaHome />,
    Users: <FaUsers />,
    Cryptocurrencies: <FaCoins />,
    Heatmaps: <FcHeatMap />,
    Mapascalor: <FcHeatMap />,
}
