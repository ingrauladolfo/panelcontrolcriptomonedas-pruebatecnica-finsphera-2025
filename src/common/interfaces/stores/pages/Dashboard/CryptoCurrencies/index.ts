export interface CryptoState {
    criptos: any[];
    cripto: any | undefined;

    symbol: string;
    loading: boolean;
    error: string | null;
    selectedCoinSymbol: string | null;
    fetchCriptos: (lang: any) => void;
    fetchCripto: (symbol: string) => void;
    fetchCryptoValue: (symbol: string, interval: string) => void;
    handleViewCoin: (navigate: any, symbol: string, lang: any) => void;
    handleViewChart: (navigate: any, symbol: string, lang: any) => void;
    handlePageChange: (page: any) => void;
    handleItemsPerPageChange: (e: any) => void;
    renderPageNumbers: (pages: number, currentPage: number) => (number | string)[];
    currentPage: number;
    itemsPerPage: number;
    filteredCriptos: any[];
    handleSearch: (data: any[]) => void;

    // Nueva parte para charts / velas
    chartSeries: any[];         // estructura ready-to-use para ApexCharts: [{ data: [{ x: Date, y: [o,h,l,c] }, ...] }]
    chartRaw: any[];            // datos crudos devueltos por la API uiKlines
    currentInterval: string;    // intervalo actualmente seleccionado (ej: '1m', '1h', '1d', ...)
}
