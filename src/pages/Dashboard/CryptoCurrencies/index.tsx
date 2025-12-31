// DashboardCryptoCurrencies.tsx
import { itemsPerPageOptions, textCurrencies } from "@/assets/data";
import { Card, Loading, Pagination, Search, NullResults } from "@/common/components/";
import { useLanguage } from "@/common/context";
import { useCryptoStore } from "@/common/stores";
import { useLayoutEffect, useMemo, useRef, useState, type FC } from "react";
import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router";

export const DashboardCryptoCurrencies: FC = () => {
    const { criptos, fetchCriptos, symbol, loading, error, handleViewCoin, handleViewChart, handlePageChange, renderPageNumbers, itemsPerPage, currentPage, handleItemsPerPageChange } = useCryptoStore();
    const navigate = useNavigate();
    const { lang } = useLanguage();
    const t = textCurrencies[lang] || textCurrencies.en;
    console.log({ criptos })
    const fetchCriptosRef = useRef(false);

    useLayoutEffect(() => {
        if (!fetchCriptosRef.current) {
            fetchCriptos(lang);
            fetchCriptosRef.current = true;
        }
    }, [fetchCriptos, lang]);

    const memoizedCriptos = useMemo(() => criptos || [], [criptos]);

    // local state to store results coming from <Search onSearch={...} />
    const [searchResults, setSearchResults] = useState<any[] | null>(null);
    const [searchTerm, setSearchTerm] = useState<any>("");

    // apply symbol filter first (keeps same behavior as before)
    const baseFiltered = memoizedCriptos.filter((cripto: any) => {
        let isValid = true;
        if (symbol && cripto.symbol !== symbol) isValid = false;
        return isValid;
    });

    // if Search returned results, use them (Search is fed with baseFiltered below)
    const displayList = searchResults !== null ? searchResults : baseFiltered;

    const pages = Math.ceil(displayList.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    if (loading) return <Loading className="text-center py-8" />;
    if (error) return <div className="text-center py-8">Error: {error}</div>;

    const handleViewCopper = (symbol: string) => {
        handleViewCoin(navigate, symbol, lang);
    };
    const handleViewGraph = (symbol: string) => {
        handleViewChart(navigate, symbol, lang)
        // Implementa la lógica para ver la gráfica
    };
    return (
        <div className="flex flex-col items-center p-5">
            <div className="flex items-center mb-5">
                <FaCoins className="text-[24px] text-[#d1d1d1] mr-2.5" />
                <h1 className="text-[24px] text-[#d1d1d1] m-0 ">{t.title}</h1>
            </div>

            <Search
                data={baseFiltered}                // <-- pass already-symbol-filtered list
                filterKey="symbol"
                placeholder="Buscar por símbolo"
                onSearch={(filtered, term) => {
                    // Search returns an array — store it (or null if empty to show baseFiltered)
                    setSearchResults(Array.isArray(filtered) ? filtered : null);
                    setSearchTerm(term);
                    // reset page to 1 when search changes
                    handlePageChange(1);
                }}
            />

            {displayList.length === 0 ? (
                <NullResults text={searchTerm} module={t.moduleName} />
            ) : (
                <div className="grid grid-cols-[1fr] gap-5 min-[480px]:grid-cols-2 md:grid-cols-4">
                    {displayList.slice(start, end).map((cripto: any, index: any) => (
                        <Card
                            title={t.priceTitle}
                            key={cripto.symbol ?? index}
                            type="normal"
                            data={cripto}
                            onView={() => handleViewCopper(cripto.symbol)}
                            onViewGraph={() => handleViewGraph(cripto.symbol)}
                            dataType="crypto"

                        />
                    ))}
                </div>
            )}

            <Pagination pages={renderPageNumbers(pages, currentPage)} currentPage={currentPage} handlePageChange={handlePageChange} itemsPerPage={itemsPerPage} handleItemsPerPageChange={handleItemsPerPageChange} itemsPerPageOptions={itemsPerPageOptions} t={t} />

        </div>
    );
};