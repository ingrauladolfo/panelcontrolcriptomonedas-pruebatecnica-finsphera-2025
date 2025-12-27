// icons.ts
import type { JSX } from 'react';
import { FaCoins, FaHome, FaUsers } from 'react-icons/fa';

export const icons: Record<string, JSX.Element> = {
    Inicio: <FaHome />,
    Usuarios: <FaUsers />,
    Criptomonedas: <FaCoins />,
    Home: <FaHome />,
    Users: <FaUsers />,
    Cryptocurrencies: <FaCoins />,
};