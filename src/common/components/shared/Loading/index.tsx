/**
 * The `Loading` component displays a loading spinner and a message based on the current language and
 * the path being loaded.
 * @param  - The code you provided is a React functional component called `Loading`. It displays a
 * loading spinner along with a message based on the current language and the path being accessed.
 * Here's a breakdown of the key parts:
 * @returns The `Loading` component is being returned. It is a functional component that displays a
 * loading spinner and a text indicating the loading status based on the current language and the path
 * being loaded. The component dynamically determines the title to display based on the current path
 * and language, falling back to 'Error' if no matching path is found.
 */
import type { FC } from 'react';
import { useLocation } from 'react-router';
import { pathToTitle } from '@/assets/data';
import { useLanguage } from '@/common/context';

interface LoadingProps {
    className?: string
}
export const Loading: FC<LoadingProps> = ({ className }) => {
    const { pathname } = useLocation();
    const { lang } = useLanguage();  // Obtiene el idioma desde el contexto
    // Buscar coincidencia en pathToTitle usando el idioma actual
    const matched = pathToTitle.find(p => p.path[lang] === pathname);

    // Si no hay coincidencia, mostrar 'Error'
    const title = matched ? matched.title[lang].split('|')[0].trim() : 'Error';  // Modificado para que diga "Error" si no hay coincidencia

    return (
        <div className={`flex flex-col items-center justify-center w-full h-screen gap-6 text-center ${className}`}>
            <div className={`w-12 h-12 border-4 rounded-full animate-spin`} />
            <p className={`text-lg`}>
                {lang === 'es' ? 'Cargando' : 'Loading'} {title}
            </p>
        </div>
    );
};