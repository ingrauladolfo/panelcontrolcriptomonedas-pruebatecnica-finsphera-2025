/* This code snippet is creating a custom hook called `useCryptoStore` using Zustand, a small and fast
state management library for React. */
import { create } from 'zustand'
import axios from 'axios'
import { pathToTitle } from '@/assets/data'
import type { CryptoState } from '@/common/interfaces'

export const useCryptoStore = create<CryptoState>((set, get) => ({
    criptos: [],
    cripto: undefined,
    loading: false,
    error: null,
    selectedCoinSymbol: null,
    currentPage: 1,
    itemsPerPage: 5,
    symbol: '',
    filteredCriptos: [],
    // chart related
    chartSeries: [],          // Apex series
    chartRaw: [],             // raw response from API
    currentInterval: '1d',    // last requested interval

    fetchCriptos: async (_lang: string) => {
        set({ loading: true })
        try {
            const response = await axios.get('https://data-api.binance.vision/api/v3/ticker/price')
            const criptoData = response.data
            set({ criptos: criptoData, loading: false })
        } catch (error: any) {
            set({ error: error.message, loading: false })
        }
    },

    fetchCripto: async (symbol: string) => {
        set({ loading: true })
        try {
            const response = await axios.get(`https://api.binance.com/api/v3/ticker?symbol=${symbol}`)
            const criptoData = response.data
            // keep the ticker summary in cripto
            set({ cripto: criptoData, loading: false })
        } catch (error: any) {
            set({ error: error.message, loading: false })
        }
    },

    // fetch klines / uiKlines and build Apex candlestick series
    fetchCryptoValue: async (symbol: string, interval: string) => {
        set({ loading: true, error: null })
        try {
            // corrected template literal
            const response = await axios.get(`https://api.binance.com/api/v3/uiKlines?symbol=${symbol}&interval=${interval}`)
            const raw = response.data || []

            // transform each kline row to Apex format:
            // uiKlines returns array of arrays where indices are like:
            // [openTime, open, high, low, close, volume, closeTime, ...]
            const data = (raw as any[]).map((row: any[]) => {
                const t = Number(row[0]) // open time (ms) or timestamp
                const open = Number(row[1])
                const high = Number(row[2])
                const low = Number(row[3])
                const close = Number(row[4])
                return {
                    x: new Date(t),
                    y: [open, high, low, close],
                }
            })

            const series = [{ name: symbol, data }]

            set({
                chartSeries: series,
                chartRaw: raw,
                currentInterval: interval,
                loading: false,
            })
        } catch (error: any) {
            set({ error: error.message, loading: false })
        }
    },

    handleViewCoin: (navigate: any, symbol: string, lang: 'es' | 'en') => {
        const path = pathToTitle.find(p => p.path.es === '/dashboard/criptomoneda' || p.path.en === '/dashboard/cryptocurrency');
        const url = lang === 'es' ? path?.path.es : path?.path.en;
        set({ selectedCoinSymbol: symbol });
        navigate(`${url}?symbol=${symbol}`);
    },
    handleViewChart: (navigate: any, symbol: string, lang: 'es' | 'en') => {
        const path = pathToTitle.find(p => p.path.es === '/dashboard/grafica' || p.path.en === '/dashboard/chart');
        const url = lang === 'es' ? path?.path.es : path?.path.en;
        set({ selectedCoinSymbol: symbol });
        navigate(`${url}?symbol=${symbol}`);
    },

    handlePageChange: (page: any) => {
        if (page !== '...') {
            set({ currentPage: page });
        }
    },
    handleItemsPerPageChange: (e: any) => {
        set({ itemsPerPage: parseInt(e.target.value), currentPage: 1 });
    },

    renderPageNumbers: () => {
        const pages = Math.ceil(get().criptos.length / get().itemsPerPage);
        const currentPage = get().currentPage;

        if (pages <= 5) {
            return Array(pages).fill(0).map((_, i) => i + 1);
        }

        const isNearStart = currentPage <= 3;
        const isNearEnd = currentPage >= pages - 2;

        const startPages = isNearStart ? Array(3).fill(0).map((_, i) => i + 1) : [1, 2, '...'];
        const middlePages = isNearStart || isNearEnd ? [] : [currentPage - 1, currentPage, currentPage + 1];
        const endPages = isNearEnd ? Array(3).fill(0).map((_, i) => pages - 2 + i) : ['...', pages - 1, pages];

        return [...startPages, ...middlePages, ...endPages];
    },
    handleSearch: (data: any[]) => {
        set({ filteredCriptos: data });
    },
    resetCripto: () => {
        set({ cripto: undefined, loading: true });
    },

    getCriptoData: () => {
        return get().cripto;
    },
}))