/**
 * The `NullResults` component displays a message indicating no results found based on the provided
 * text and module in the specified language.
 * @param {NullResultsFoundProps}  - The `NullResults` component takes two props:
 * @returns The `NullResults` component is returning a JSX element that displays a message based on the
 * current language (`lang`) and the provided `text` and `module` props. The message will either
 * indicate that the specified `text` was not found in the `module`, or that there is no data in the
 * `module`. The message is displayed in the center of the page with some padding.
 */
// NoResultsFound.tsx

import { useLanguage } from "@/common/context";
import type { NullResultsFoundProps } from "@/common/interfaces";

export const NullResults = ({ text, module }: NullResultsFoundProps) => {

    const { lang } = useLanguage();
    const t = {
        es: text ? `No encontramos ${text} en el módulo: ${module}` : `No hay datos en el módulo: ${module}`,
        en: text ? `${text} was not found in the module: ${module}` : `No data in the module: ${module}`,
    };
    return (
        <div className="text-center py-8">
            {t[lang]}
        </div>
    );
};