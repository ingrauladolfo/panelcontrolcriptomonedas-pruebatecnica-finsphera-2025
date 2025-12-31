/* This code snippet is defining a custom hook called `useCryptoHeatmapStore` using Zustand, a small
and fast state management library for React. Here's a breakdown of what the code is doing: */
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