/* This code snippet is defining an object named `textLogin` that contains language-specific login text
for both Spanish (es) and English (en) languages. Each language has properties such as `title`,
`userTitle`, `userPlaceHolder`, `passwordTitle`, `passwordPlaceHolder`, and `login` with
corresponding text values for a login form. This object can be exported and used in a TypeScript
file to provide language-specific login text for a web application. */
export const textLogin = {
    es: { title: 'Iniciar sesión', userTitle: 'Usuario', userPlaceHolder: 'Ingrese su usuario', passwordTitle: 'Contraseña', passwordPlaceHolder: 'Ingrese su contraseña', login: "Iniciar sesión", },
    en: {
        title: 'Login', userTitle: 'Username', userPlaceHolder: 'Enter your username', passwordTitle: 'Password', passwordPlaceHolder: 'Enter your password', login: "Login",
    }
}