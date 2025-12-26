// cryptoStore.ts
import { create } from 'zustand'
import axios from 'axios'
import { useLanguage } from '@/common/context'
import { pathToTitle } from '@/assets/data'

interface CryptoState {
    criptos: any[]
    loading: boolean
    error: string | null
    fetchCriptos: () => void
    selectedCoinSymbol: string | null;
    handleViewCoin: (navigate: any, symbol: string) => void;

}
//With image
/* export const useCryptoStore = create<CryptoState>((set) => ({
    criptos: [],
    loading: false,
    error: null,
    fetchCriptos: async () => {
        set({ loading: true })
        try {
            const binanceResponse = await axios.get('https://data-api.binance.vision/api/v3/exchangeInfo')
            const criptoData = binanceResponse.data.symbols

            const coingeckoResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            const coingeckoData = coingeckoResponse.data

            const criptosWithImage = criptoData.map((cripto: any) => {
                const coingeckoCripto = coingeckoData.find((c: any) => c.symbol === cripto.baseAsset.toLowerCase())
                return { ...cripto, image: coingeckoCripto?.image }
            })

            set({ criptos: criptosWithImage, loading: false })
        } catch (error: any) {
            set({ error: error.message, loading: false })
        }
    }
})) */
//Without image
export const useCryptoStore = create<CryptoState>((set) => ({
    criptos: [],
    loading: false,
    error: null,
    selectedCoinSymbol: null,

    fetchCriptos: async () => {
        set({ loading: true })
        try {
            const response = await axios.get('https://data-api.binance.vision/api/v3/ticker/price')
            console.log({ response })
            const criptoData = response.data
            set({ criptos: criptoData, loading: false })
        } catch (error: any) {
            set({ error: error.message, loading: false })
        }
    },
    handleViewCoin: (navigate: any, symbol: string) => {
        const { lang } = useLanguage();
        const path = pathToTitle.find(p => p.path.es === '/dashboard/criptomoneda' || p.path.en === '/dashboard/cryptocurrency');
        const url = path?.path[lang];
        set({ selectedCoinSymbol: symbol });
        navigate(`${url}?symbol=${symbol}`);
    }
}))