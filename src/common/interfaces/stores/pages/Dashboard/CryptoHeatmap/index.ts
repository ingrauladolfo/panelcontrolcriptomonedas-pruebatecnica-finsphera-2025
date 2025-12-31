/* This TypeScript code is defining two interfaces: `CryptoHeatmapItem` and `CryptoHeatmapState`. */

export interface CryptoHeatmapItem {
    symbol: string
    bidPrice: string
    bidQty: string
    askPrice: string
    askQty: string
    id?: string
}
export interface CryptoHeatmapState {
    heatmap: CryptoHeatmapItem[]
    loading: boolean
    error: string | null
    fetchCryptoHeatmap: (symbol: any) => Promise<void>
    fetchCryptosHeatmap: () => Promise<void>
    reset: () => void
}


