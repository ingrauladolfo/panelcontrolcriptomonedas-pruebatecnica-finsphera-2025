/* This code snippet is defining an object named `textUsers` that contains translations for text
related to users in different languages. The object has two properties, `es` for Spanish
translations and `en` for English translations. Each language property contains an object with keys
for `title`, `rowPerPage`, and `moduleName`, each with their respective translated values. This
object can be exported and used in other parts of the codebase to display user-related text in
different languages. */
export const textUsers = {
    es: { title: 'Usuarios', rowPerPage: 'Filas por página', moduleName: 'usuarios', },
    en: {
        title: 'Users', rowPerPage: 'Rows per page', moduleName: 'users',
    }
}