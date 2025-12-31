import { create } from 'zustand'
import axios from 'axios'
import type { CryptoHeatmapState } from '@/common/interfaces'

export const useCryptoHeatmapStore = create<CryptoHeatmapState>((set) => ({
    heatmap: [],
    loading: false,
    error: null,

    // fetch single symbol (ensures ?symbol=... is used)
    fetchCryptoHeatmap: async (symbol: any) => {
        set({ loading: true, error: null })
        try {
            const url = `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${encodeURIComponent(symbol)}`
            const res = await axios.get(url)
            // API returns single object for ?symbol=, wrap into array
            const data = Array.isArray(res.data) ? res.data : [res.data]
            set({ heatmap: data, loading: false })
        } catch (err: any) {
            set({ error: err?.message ?? String(err), loading: false })
        }
    },
    // fetch all (no params)
    fetchCryptosHeatmap: async () => {
        set({ loading: true, error: null })
        try {
            const url = `https://api.binance.com/api/v3/ticker/bookTicker`
            const res = await axios.get(url)
            const data = Array.isArray(res.data) ? res.data : [res.data]
            set({ heatmap: data, loading: false })
        } catch (err: any) {
            set({ error: err?.message ?? String(err), loading: false })
        }
    },

    reset: () => set({ heatmap: [], loading: false, error: null }),
}))
/* export const useCryptoHeatmapStore = create<CryptoHeatmapState>((set, get) => ({
    heatmap: [],
    loading: false,
    error: null,

    fetchCryptosHeatmap: async () => {
        set({ loading: true, error: null })
        try {
            const url = 'https://api.binance.com/api/v3/ticker/bookTicker'
            const response = await axios.get(url)
            const data = Array.isArray(response.data)
                ? response.data
                : [response.data]

            const currentHeatmap = get().heatmap;
            if (currentHeatmap.length > 0) {
                set({ heatmap: [...currentHeatmap, ...data], loading: false })
            } else {
                set({ heatmap: data, loading: false })
            }
        } catch (error: any) {
            set({ error: error.message, loading: false })
        }
    },

    fetchCryptoHeatmap: async (symbol) => {
        set({ loading: true, error: null })
        try {
            const url = `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${symbol}`
            const response = await axios.get(url)
            const data = Array.isArray(response.data)
                ? response.data
                : [response.data]

            const currentHeatmap = get().heatmap;
            if (currentHeatmap.length > 0) {
                set({ heatmap: data, loading: false })
            } else {
                set({ heatmap: data, loading: false })
            }
        } catch (error: any) {
            set({ error: error.message, loading: false })
        }
    },

    resetHeatmap: () => set({ heatmap: [] }),
})) */