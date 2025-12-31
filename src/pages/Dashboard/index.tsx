import { Navbar } from "@/common/components"
import { Outlet } from "react-router"

export const DashboardLayout = () => {
    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-200 `}>
            <Navbar />
            <div className="flex-1 pt-20"> {/* 👈 Ajuste clave aquí */}
                <Outlet />
            </div>
        </div>
    )
}
