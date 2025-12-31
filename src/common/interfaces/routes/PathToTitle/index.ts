/* This code snippet is defining an interface in TypeScript called `PathToTitle`. This interface has
two properties: `path` and `title`, each of which is an object with `es` and `en` properties of type
string. This interface can be used to define the structure of objects that have `path` and `title`
properties with language-specific strings for Spanish (`es`) and English (`en`). */
export interface PathToTitle {
    path: { es: string, en: string }
    title: { es: string, en: string }
}