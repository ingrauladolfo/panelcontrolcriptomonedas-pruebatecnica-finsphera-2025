/* This code snippet is defining an interface named `UserProfileProps` in TypeScript. Interfaces in
TypeScript are used to define the structure of an object. */
export interface UserProfileProps {
    user: any
    initials: string | null
    loadFromStorage: () => void
    showLogoutModal: boolean
    openLogoutModal: () => void
    closeLogoutModal: () => void
    confirmLogout: () => void
    confirmText: string;
    cancelText: string;
}
