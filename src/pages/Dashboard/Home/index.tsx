// DashboardHome.tsx
import { useDashboardHomeStore } from "@/common/stores/pages/Dashboard/Home";
import { useNavigate } from "react-router";
import { useLanguage } from '@/common/context';
import { Button, Loading } from "@/common/components";
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

    if (!userProfile) return <Loading className="text-[clamp(1.5rem, 5vw, 2rem)] text-center p-4" />
    const saludo = getSaludo(userProfile.name.title, lang);
    const handleNavigate = (path: string) => {
        navigate(path);
    };
    return (
        <div className="flex flex-col items-center p-4 max-w-dvw text-white">
            <h1 className="text-center text-[clamp(1.5rem, 5vw, 2rem)] mb-4">{saludo} {userProfile.name.title} {userProfile.name.first} {userProfile.name.last} al panel administrativo de <img src="/assets/img/isologo - finsphera.webp" className="inline-block align-middle size-[10%] ml-2 mb-5" alt="Logo de Finsphera" /></h1>
            <div className="grid gap-4 w-full my-0 mx-auto grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-w-[calc(220px*4+(1rem*3))] justify-center items-stretch box-border py-0 px-4">
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        onClick={() => handleNavigate(button.path)}
                        type="button"
                        rounded="rounded-lg"
                        className="bg-[#333333]"
                    >
                        <span className="inline-flex items-center gap-2 w-full justify-center text-[clamp(0.95rem, 2.4vw, 1.05rem)]">
                            {icons[button.title] && <span className="inline-flex items-center text-[1.15em] opacity-[0.98] size-[1.4em]">{icons[button.title]}</span>}
                            <span className="whitespace-nowrap overflow-hidden text-ellipsis">{button.title}</span>
                        </span>
                    </Button>
                ))}
            </div>
        </div>
    )
}
