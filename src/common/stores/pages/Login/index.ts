// useLoginStore.ts
import { create } from 'zustand'
import axios from 'axios'
import type { StoreLogin } from '@/common/interfaces'

export const useLoginStore = create<StoreLogin>((set, get) => ({
    users: [],
    username: '',
    password: '',
    showModal: false,
    modalMessage: '',
    hasFetched: false,
    isAuthenticated: false,

    setUsername: (username) => set({ username }),
    setPassword: (password) => set({ password }),

    fetchUsers: async () => {
        if (get().hasFetched) return
        set({ hasFetched: true })

        try {
            const usersRes = await axios.get('https://randomuser.me/api/?results=10')
            set({ users: usersRes.data.results })
        } catch {
            set({
                hasFetched: false,
                showModal: true,
                modalMessage: 'Error al obtener usuarios',
            })
        }
    },
    login: async () => {
        const { username, password, users } = get()

        const user = users.find(
            (u: any) =>
                u.login?.username === username &&
                u.login?.password === password
        )
        if (!user) {
            set({
                showModal: true,
                modalMessage: 'Usuario o contraseña incorrectos',
            })
            return false
        }
        const authenticatedUser = { ...user, authenticated: true };

        localStorage.setItem('userProfile', JSON.stringify(authenticatedUser))
        localStorage.setItem('users', JSON.stringify(users))

        try {
            const nationalities = [
                ...new Set(users.map((u: any) => u.nat).filter(Boolean))
            ]
            localStorage.setItem('userNationalities', JSON.stringify(nationalities))
        } catch { }

        set({
            isAuthenticated: true,
            showModal: true,
            modalMessage: 'Inicio de sesión exitoso',
        })

        return true
    },

    handleSubmit: async (e) => {
        e.preventDefault()
        await get().login()
    },

    handleLogin: async (navigate) => {
        const ok = await get().login()
        if (ok) navigate('/dashboard/home')
    },

    handleCloseModal: () => set({ showModal: false }),

    checkAuth: () => {
        const raw = localStorage.getItem('userProfile');
        if (!raw) {
            set({ isAuthenticated: false });
            return;
        }
        try {
            const parsed = JSON.parse(raw);
            // aceptar si explicitamente tiene authenticated true, o si parece un perfil válido
            const authed = !!(
                parsed.authenticated === true ||
                parsed.authenticated === 'true' ||
                parsed.login?.username ||
                parsed.name
            );
            set({ isAuthenticated: authed });
        } catch {
            set({ isAuthenticated: false });
        }
    },
}))

// Ejecutar comprobación al importar el módulo
useLoginStore.getState().checkAuth();
