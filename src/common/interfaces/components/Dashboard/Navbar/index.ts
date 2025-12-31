/**
 * The type definitions include RandomUser and UserState types with specific properties and methods
 * related to user information and state management.
 * @property {string} email - The `email` property in the `RandomUser` type represents the email
 * address of a user.
 * @property name - The `name` property in the `RandomUser` type consists of three sub-properties:
 * @property login - The `login` property in the `RandomUser` type is an optional property that can
 * have a nested `username` property of type string. This means that a `RandomUser` object may or may
 * not have a `login` property, and if it does, the `login` property may
 * @property {any} [k: any] - The `[k: string]: any` syntax in TypeScript defines an index signature
 * for the `RandomUser` type. It means that `RandomUser` can have additional properties with keys of
 * type `string` and values of type `any`. This allows for flexibility in adding extra properties to
 * objects of type
 */
export type RandomUser = {
    email: string
    name: { title: string; first: string; last: string }
    login?: { username?: string }
    [k: string]: any
}

export type UserState = {
    user: RandomUser | null
    showLogoutModal: boolean

    loadFromStorage: () => void
    openLogoutModal: () => void
    closeLogoutModal: () => void
    confirmLogout: () => void
    computeInitials: () => string | null
}