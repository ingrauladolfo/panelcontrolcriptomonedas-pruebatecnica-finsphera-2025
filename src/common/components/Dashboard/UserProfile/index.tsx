/* This code snippet is a TypeScript React component called `UserProfile`. It receives props such as
`user`, `initials`, `loadFromStorage`, `showLogoutModal`, `openLogoutModal`, `closeLogoutModal`,
`confirmLogout`, `confirmText`, and `cancelText`. */
import type { UserProfileProps } from "@/common/interfaces"
import { useLayoutEffect, useRef, useState, type FC } from "react"
import { Button } from "../../shared/Button"
import { FaEnvelope, FaUser } from "react-icons/fa6"
import { Modal } from "../../shared/Modal"

export const UserProfile: FC<UserProfileProps> = ({ user, initials, loadFromStorage, showLogoutModal, openLogoutModal, closeLogoutModal, confirmLogout, confirmText, cancelText }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [])

    useLayoutEffect(() => {
        if (open) loadFromStorage()
    }, [open, loadFromStorage])
    return (
        <div className="relative mb-2.5 mt-2.5">
            <Button className="py-1.5 px-2.5 border border-[#dddd] bg-inherit cursor-pointer text-white mb-3.75" type="button" onClick={() => setOpen(v => !v)}>
                {user?.picture?.thumbnail ? (
                    <img src={user.picture.thumbnail} alt="Avatar" className="size-8 rounded-[50%] mr-2" />
                ) : null}
                <span className="text-[14px] font-bold">{initials ?? 'Perfil'}</span>
            </Button>
            {open && (
                <div className="absolute right-0 md:mt-2 min-w-55 bg-inherit border border-[#e6e6e6] rounded-lg shadow-[0 6px 20px rgba(0, 0, 0, 0.08)] p-3 z-100">
                    {!user && <div className="py-2 px-0">Usuario no encontrado</div>}

                    {user && (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                                <FaUser className="mr-2.5 text-[18px]" />
                                {user.name.title} {user.name.first} {user.name.last}
                            </div>
                            <div className="flex items-center">
                                <FaEnvelope className="mr-2.5 text-[18px]" />
                                {user.email}
                            </div>

                            {/* Logout usando Button compartido */}
                            <Button className="logout-btn" type="button" onClick={openLogoutModal}>
                                Cerrar sesión
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {showLogoutModal && (
                <Modal
                    message="¿Deseas cerrar sesión?"
                    onConfirm={confirmLogout}
                    onClose={closeLogoutModal}
                    confirmText={confirmText}
                    cancelText={cancelText}
                />
            )}
        </div>
    )
}
