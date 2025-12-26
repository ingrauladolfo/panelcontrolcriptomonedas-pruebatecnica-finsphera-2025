import { pagesMap, pathToTitle } from '@/assets/data';
import { Loading } from '@/common/components';
import { useLanguage } from '@/common/context';
import { isPublic } from '@/common/functions/isPublic';
import { useLoginStore } from '@/common/stores';
import { DashboardLayout } from '@/pages';
import { lazy, Suspense, useLayoutEffect, useMemo, type ComponentType, type FC, type LazyExoticComponent } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';

export const AppRouter: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { lang } = useLanguage();

    const { isAuthenticated } = useLoginStore();

    const currentPath = location.pathname;
    const normalizedPath = currentPath === '/' ? '/login' : currentPath.split('?')[0];

    const matchedRoute = useMemo(
        () =>
            pathToTitle.find(entry =>
                Object.values(entry.path).some(path => {
                    const pathWithoutParams = path.split('?')[0];
                    return pathWithoutParams === normalizedPath;
                })
            ),
        [normalizedPath]
    );

    const isPublicRoute = useMemo(
        () => isPublic(normalizedPath),
        [normalizedPath]
    );
    useLayoutEffect(() => { document.title = matchedRoute ? matchedRoute.title[lang] : lang === 'en' ? 'Error | Page not found' : 'Error | Página no encontrada'; }, [matchedRoute, lang]);

    useLayoutEffect(() => {
        if (!matchedRoute) return;
        const newPath = matchedRoute.path[lang];
        if (newPath && normalizedPath !== newPath.split('?')[0]) {
            navigate(newPath, { replace: true });
        }
    }, [matchedRoute, lang, normalizedPath, navigate]);

    const LoaderComponent = useMemo(() => {
        /* if (!matchedRoute) return () => <NotFound />; */
        if (!matchedRoute) return () => 'Página no encontrada';

        const loader = pagesMap[matchedRoute.path.en] || pagesMap[matchedRoute.path.es];
        /* if (!loader) return () => <UnderConstruction />; */
        if (!loader) return () => 'Página en construcción';

        return lazy(loader);
    }, [matchedRoute]);

    // Asegurar que rutas públicas traducidas estén registradas
    const publicPaths = useMemo(() => {
        const fromMap = Object.keys(pagesMap).filter(p => isPublic(p));
        const fromTitles = pathToTitle.flatMap(({ path }) =>
            [path.en, path.es].filter(p => isPublic(p))
        );
        return Array.from(new Set([...fromMap, ...fromTitles]));
    }, []);

    const lazyMap = useMemo(() => {
        const m: Record<string, LazyExoticComponent<ComponentType<any>>> = {};
        Object.entries(pagesMap).forEach(([p, loader]) => {
            if (isPublic(p)) {
                m[p] = lazy(loader);
            }
        });

        // Asegurar rutas traducidas
        pathToTitle.forEach(({ path }) => {
            const { en, es } = path;
            if (isPublic(en) && pagesMap[en]) {
                m[en] ??= lazy(pagesMap[en]);
            }
            if (isPublic(es) && pagesMap[es]) {
                m[es] ??= lazy(pagesMap[es]);
            }
        });

        return m;
    }, []);
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />

            {/* Rutas públicas traducidas */}
            {publicPaths.map(p => {
                const Comp = lazyMap[p];
                return (
                    <Route
                        key={p}
                        path={p}
                        element={
                            <Suspense fallback={<Loading />}>
                                <Comp />
                            </Suspense>
                        }
                    />
                );
            })}

            {/* Render dinámico según si la ruta es pública o protegida */}
            {isPublicRoute ? (
                <Route
                    path={normalizedPath}
                    element={
                        <Suspense fallback={<Loading />} >
                            <LoaderComponent />
                        </Suspense>
                    }
                />
            ) : (
                <Route
                    path="/dashboard/*"
                    element={
                        isAuthenticated ? (
                            <DashboardLayout />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                >
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<Loading />}>
                                <LoaderComponent />
                            </Suspense>
                        }
                    />
                </Route>
            )}

            {/* Fallback global */}
            <Route
                path="*"
                element={
                    <Suspense fallback={<Loading />}>
                        <LoaderComponent />
                    </Suspense>
                }
            />
        </Routes>
    )
}