/* This TypeScript code snippet is importing specific components from the 'react-icons' library and
defining an object named `icons` that maps string keys to JSX elements representing different icons.
Here's a breakdown of what each part of the code is doing: */
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
