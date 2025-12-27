import { BrowserRouter } from 'react-router'
import { AppRouter } from './AppRouter'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AppRouter />
            {/*  <Login /> */}
        </BrowserRouter>
    )
}
