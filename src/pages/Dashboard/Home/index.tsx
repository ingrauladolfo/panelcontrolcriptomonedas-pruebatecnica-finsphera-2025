// DashboardHome.tsx
import { useDashboardHomeStore } from "@/common/stores/pages/Dashboard/Home";
import { useNavigate } from "react-router";
import { useLanguage } from '@/common/context';
import { Button } from "@/common/components";
import { icons } from "@/assets/data";
import { useLayoutEffect } from "react";

export const DashboardHome = () => {
    const { userProfile, buttons, loadUserProfile, loadButtons, getSaludo } = useDashboardHomeStore();
    const navigate = useNavigate();
    const { lang } = useLanguage()

    useLayoutEffect(() => {
        loadUserProfile();
        loadButtons(lang);
    }, [loadUserProfile, loadButtons, lang]);

    if (!userProfile) return <div className="loading">Cargando...</div>;

    const saludo = getSaludo(userProfile.name.title, lang);


    const handleNavigate = (path: string) => {
        navigate(path);
    };
    return (
        <div className="flex flex-col items-center p-4 max-w-full text-white">
            <h1 className="text-2xl md:text-3xl mb-4">
                {saludo} {userProfile.name.title} {userProfile.name.first} {userProfile.name.last}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center ">
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        onClick={() => handleNavigate(button.path)}
                        type="button"
                        className="bg-[#333333] text-[#F7F7F7] hover:bg-gray-700 transition duration-150 ease-in-out w-full"
                    >
                        <span className="inline-flex items-center gap-2 w-full justify-center text-[clamp(0.95rem,2.4vw,1.05rem)]">
                            {icons[button.title] && <span className="inline-flex items-center justify-center text-2xl opacity-[0.98] size-[1.4em]">{icons[button.title]}</span>}
                            <span className="text-base whitespace-nowrap overflow-hidden text-ellipsis">{button.title}</span>
                        </span>
                    </Button>
                ))}
            </div>

        </div>
    )
}