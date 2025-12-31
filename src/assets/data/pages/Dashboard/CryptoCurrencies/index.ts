/* This code snippet is defining an object named `textCurrencies` that contains language-specific
properties for displaying information related to cryptocurrencies. The object has two properties:
`es` for Spanish and `en` for English. Each language property contains key-value pairs for the
title, price title, rows per page, and module name related to cryptocurrencies in that specific
language. This structure allows for easy localization and display of text in different languages
within a TypeScript application. */
export const textCurrencies = {
    es: { title: 'Criptomonedas', priceTitle: 'Último Precio', rowPerPage: 'Filas por página', moduleName: 'criptomonedas', },
    en: {
        title: 'Cryptocurrencies', priceTitle: 'Last Price', rowPerPage: 'Rows per page', moduleName: 'cryptocurrencies',
    }
}