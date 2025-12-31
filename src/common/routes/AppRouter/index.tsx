/* This code snippet defines a React functional component called `AppRouter` that serves as the main
router for the application. Here's a breakdown of what the code is doing: */
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
    // no mapear "/" a "/login" aquí; dejar el path real
    const normalizedPath = currentPath.split('?')[0];

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

    useLayoutEffect(() => {
        document.title = matchedRoute ? matchedRoute.title[lang] : lang === 'en' ? 'Error | Page not found' : 'Error | Página no encontrada';
    }, [matchedRoute, lang]);

    useLayoutEffect(() => {
        if (!matchedRoute) return;
        const newPath = matchedRoute.path[lang];
        if (newPath && normalizedPath !== newPath.split('?')[0]) {
            navigate(newPath, { replace: true });
        }
    }, [matchedRoute, lang, normalizedPath, navigate]);

    const LoaderComponent = useMemo(() => {
        if (!matchedRoute) return () => 'Página no encontrada';

        const loader = pagesMap[matchedRoute.path.en] || pagesMap[matchedRoute.path.es];
        if (!loader) return () => 'Página en construcción';

        return lazy(loader);
    }, [matchedRoute]);

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

    // decidir destino inicial para "/"
    const hasSession = isAuthenticated || (() => {
        try {
            const raw = localStorage.getItem('userProfile');
            if (!raw) return false;
            const p = JSON.parse(raw);
            return !!(p?.authenticated === true || p?.login?.username || p?.name);
        } catch {
            return false;
        }
    })();

    const dashboardRoot = lang === 'en' ? '/dashboard/home' : '/dashboard/inicio';
    const publicLogin = lang === 'en' ? '/login' : '/inicio-sesion';
    const initialRedirect = hasSession ? dashboardRoot : publicLogin;

    return (
        <Routes>
            {/* usar initialRedirect en "/" */}
            <Route path="/" element={<Navigate to={initialRedirect} replace />} />
            <Route path="/dashboard" element={<Navigate to={dashboardRoot} replace />} />

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
                        hasSession ? (
                            <DashboardLayout />
                        ) : (
                            <Navigate to={publicLogin} replace />
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
