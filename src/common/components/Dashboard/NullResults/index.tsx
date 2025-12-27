// NoResultsFound.tsx

import { useLanguage } from "@/common/context";
import type { NullResultsFoundProps } from "@/common/interfaces";

export const NullResults = ({ text, module }: NullResultsFoundProps) => {

    const { lang } = useLanguage();
    const t = {
        es: `No encontramos ${text} en ${module}`,
        en: `${text} was not found in ${module}`,
    };
    return (
        <div className="text-center py-8">
            {t[lang]}

        </div>
    );
};