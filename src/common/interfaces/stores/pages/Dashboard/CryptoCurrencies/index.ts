export interface CryptoState {
    criptos: any[]
    cripto: any | undefined;

    symbol: string
    loading: boolean
    error: string | null
    selectedCoinSymbol: string | null;
    fetchCriptos: (lang: any) => void
    fetchCripto: (symbol: string) => void
    handleViewCoin: (navigate: any, symbol: string, lang: any) => void;
    handlePageChange: (page: any) => void;
    handleItemsPerPageChange: (e: any) => void;
    renderPageNumbers: (pages: number, currentPage: number) => (number | string)[];
    currentPage: number;
    itemsPerPage: number;
    filteredCriptos: any[];
    handleSearch: (data: any[]) => void;
}