/**
 * The `AppRoutes` component in TypeScript React sets up routing using `BrowserRouter` and renders the
 * `AppRouter` component.
 */
import { BrowserRouter } from 'react-router'
import { AppRouter } from './AppRouter'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}
