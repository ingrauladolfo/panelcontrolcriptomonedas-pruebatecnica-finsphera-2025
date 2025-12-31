/* The above code is a TypeScript React component called `DashboardCryptoHeatmap`. It receives a `data`
prop of type `CryptoHeatmapProps` and uses the `useCryptoHeatmapStore` hook to manage state related
to cryptocurrency heatmap data. */
import type { CryptoHeatmapProps } from '@/common/interfaces'
import { useCryptoHeatmapStore } from '@/common/stores/pages/Dashboard/CryptoHeatmap'
import { useLayoutEffect, useMemo, type FC } from 'react'
import { useNavigate } from 'react-router'

export const DashboardCryptoHeatmap: FC<CryptoHeatmapProps> = ({ data }) => {
    const { heatmap, loading, fetchCryptoHeatmap, fetchCryptosHeatmap } = useCryptoHeatmapStore()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        // Si la URL tiene ?symbol=XXX pero NO ?modal=1 -> asumimos reload directo:
        // redirigimos al listado para evitar "landing" sin modal.
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            const symbolInUrl = params.get('symbol')
            const modalFlag = params.get('modal')

            if (symbolInUrl && modalFlag !== '1') {
                // redirige al listado de cryptocurrencies
                navigate('/dashboard/cryptocurrencies', { replace: true })
                return
            }
        }

        // comportamiento normal basado en `data`
        if (!data) {
            fetchCryptosHeatmap()
            return
        }

        if ((data as any)?.symbol) {
            fetchCryptoHeatmap((data as any).symbol)
            return
        }

        if (Array.isArray(data)) {
            const symbols = data.filter(Boolean) as string[]
            if (symbols.length === 0) {
                fetchCryptosHeatmap()
                return
            }
            try {
                ; (fetchCryptosHeatmap as any)(symbols)
                return
            } catch (e) {
                symbols.forEach(s => {
                    try {
                        fetchCryptoHeatmap(s)
                    } catch (err) {
                        // ignore individual errors
                        // eslint-disable-next-line no-console
                        console.warn('fetchCryptoHeatmap fallo para', s, err)
                    }
                })
            }
        }
    }, [data, fetchCryptoHeatmap, fetchCryptosHeatmap, navigate])

    const maxLiquidity = useMemo(
        () => Math.max(...heatmap.map(h => Number(h.bidQty) + Number(h.askQty)), 1),
        [heatmap]
    )

    const totalLiquidity = useMemo(
        () => Math.max(heatmap.reduce((acc, h) => acc + Number(h.bidQty) + Number(h.askQty), 0), 1),
        [heatmap]
    )

    const filteredHeatmap = useMemo(() => {
        if ((data as any)?.symbol) return heatmap.filter(h => h.symbol === (data as any).symbol)
        return heatmap
    }, [data, heatmap])

    const heatmapWithId = useMemo(() => {
        const counters: Record<string, number> = {}
        return filteredHeatmap.map((it) => {
            if ((it as any).id) return it
            const s = String(it.symbol ?? 'item')
            const count = (counters[s] = (counters[s] || 0) + 1)
            return { ...it, id: `${s}-${count}` }
        })
    }, [filteredHeatmap])

    if (loading) return <p className="text-center text-white">Cargando…</p>
    if (!heatmapWithId.length) return <p className="text-center text-white">No hay datos</p>

    if ((data as any)?.symbol) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {heatmapWithId.map((item: any) => {
                    const liquidity = Number(item.bidQty) + Number(item.askQty)
                    const intensity = liquidity / maxLiquidity
                    const bg = `hsl(${intensity * 120}, 70%, 45%)`

                    return (
                        <div key={item.id} className="rounded-lg p-4 text-white shadow" style={{ backgroundColor: bg }}>
                            <p className="font-bold">{item.symbol}</p>
                            <p className="text-xs">Bid: {item.bidPrice}</p>
                            <p className="text-xs">Ask: {item.askPrice}</p>
                            <p className="text-xs opacity-80">Liquidez: {liquidity.toLocaleString()}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="mb-2 text-sm text-gray-300">Heatmap (liquidez = bidQty + askQty)</div>

            <div className="flex flex-wrap gap-2" style={{ alignContent: 'flex-start' }}>
                {heatmapWithId
                    .slice()
                    .sort((a: any, b: any) => Number(b.bidQty) + Number(b.askQty) - (Number(a.bidQty) + Number(a.askQty)))
                    .map((item: any) => {
                        const liquidity = Number(item.bidQty) + Number(item.askQty)
                        const share = liquidity / totalLiquidity
                        const intensity = liquidity / maxLiquidity
                        const bg = `hsl(${intensity * 120}, 70%, 45%)`

                        const flexGrow = Math.max(0.5, share * 60)
                        const minW = Math.min(360, Math.max(80, share * 800))
                        const minH = Math.min(260, Math.max(70, share * 400))

                        return (
                            <div
                                key={item.id}
                                className="rounded-lg text-white w-full shadow flex flex-col p-3 box-border overflow-hidden"
                                style={{ backgroundColor: bg, flex: `${flexGrow} 1 ${minW}px`, minHeight: `${minH}px` }}
                                title={`${item.symbol} — Liquidez: ${liquidity.toLocaleString()}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="font-bold text-sm leading-tight">{item.symbol}</div>
                                </div>
                                <div className="text-xs opacity-90">{Math.round(share * 100)}%</div>

                                <div className="mt-2 text-xs opacity-95">Bid: {Number(item.bidPrice).toFixed(8)}</div>
                                <div className="text-xs opacity-95">Ask: {Number(item.askPrice).toFixed(8)}</div>

                                <div className="mt-auto text-xs opacity-80">{`Liq: ${liquidity.toLocaleString()}`}</div>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
