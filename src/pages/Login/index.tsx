import { useLoginStore } from '@/common/stores'
import { useLayoutEffect, useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { MX, US } from "country-flag-icons/react/3x2";
import { Modal } from '@/common/components';
import { useLanguage } from '@/common/context';
import { textLogin } from '@/assets/data';

export const Login = () => {
    const { username, password, setUsername, setPassword, fetchUsers, showModal, modalMessage, handleCloseModal, handleLogin } = useLoginStore()
    const fetchedRef = useRef(false)
    const navigate = useNavigate()
    const { lang, toggleLang } = useLanguage();
    const t = textLogin[lang] || textLogin.en;

    useLayoutEffect(() => {
        if (!fetchedRef.current) {
            fetchUsers()
            fetchedRef.current = true
        }
    }, [fetchUsers])

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await handleLogin(navigate)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="absolute top-5 right-5 flex gap-2">
                <button onClick={toggleLang}>
                    {lang === "es" ? <MX className="size-4" /> : <US className="size-4" />}
                </button>
            </div>
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white text-center mb-4">{t.title}</h2>
                <hr className="border-gray-700 mb-6" />

                <form className="flex flex-col gap-4" onSubmit={onSubmit}
                >
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-300 mb-1" htmlFor="username">
                            {t.userTitle}
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={t.userPlaceHolder}
                            autoComplete="username"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-300 mb-1" htmlFor="password">
                            {t.passwordTitle}
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t.passwordPlaceHolder}
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        className="p-3 bg-green-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        type="submit"
                    >
                        {t.login}
                    </button>
                </form>
            </div>

            {showModal && (
                <Modal message={modalMessage} onClose={handleCloseModal} cancelText={'Aceptar'} />
            )}
        </div>
    )
}
