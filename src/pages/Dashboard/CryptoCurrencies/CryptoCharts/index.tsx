// DashboardCryptoCharts.tsx
import type { FC } from "react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { Button, Loading, NullResults } from "@/common/components";
import { useCryptoStore } from "@/common/stores";
import { useLocation, useNavigate } from "react-router";
import { FaChevronLeft } from "react-icons/fa";
import { INTERVALS } from "@/assets/data";

const INFLIGHT_SET_KEY = "__kline_inflight_set";
const DONE_SET_KEY = "__kline_done_set";
const getGlobalSets = () => {
    const w = window as any;
    if (!w[INFLIGHT_SET_KEY]) w[INFLIGHT_SET_KEY] = new Set<string>();
    if (!w[DONE_SET_KEY]) w[DONE_SET_KEY] = new Set<string>();
    return { inflight: w[INFLIGHT_SET_KEY] as Set<string>, done: w[DONE_SET_KEY] as Set<string> };
};

export const DashboardCryptoCharts: FC = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const symbol = sp.get("symbol") ?? "";

    const {
        fetchCripto,
        fetchCryptoValue,
        cripto,
        chartSeries,
        currentInterval,
        loading,
        error,
    } = useCryptoStore();

    // take initial interval from the store (defaults to '1d' in store)
    const [selectedInterval, setSelectedInterval] = useState<string>(currentInterval || "1d");

    // refs to avoid duplicate work per-mount
    const fetchedSymbolRef = useRef<string | null>(null);
    useLayoutEffect(() => {
        if (!symbol) return;

        const key = `${symbol}-${selectedInterval}`;
        const { inflight, done } = getGlobalSets();

        if (done.has(key)) return; // already fetched previously
        if (inflight.has(key)) return; // request already in-flight

        inflight.add(key);

        (async () => {
            try {
                // fetch summary once per symbol
                if (fetchedSymbolRef.current !== symbol) {
                    await fetchCripto(symbol);
                    fetchedSymbolRef.current = symbol;
                }

                // fetch klines for given interval
                await fetchCryptoValue(symbol, selectedInterval);

                // mark done
                done.add(key);
            } catch {
                // store handles error state
            } finally {
                inflight.delete(key);
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol, selectedInterval, fetchCripto, fetchCryptoValue]);

    // derived values
    /* const latestClose = useMemo(() => {
        const series = (chartSeries && (chartSeries as any)[0] && (chartSeries as any)[0].data) || [];
        if (!series.length) return undefined;
        const last = series[series.length - 1];
        return last?.y?.[3] ?? undefined;
    }, [chartSeries]);
    const price = (cripto && (cripto as any).price) ?? latestClose; */

    const percent = (cripto && (cripto as any).priceChangePercent) ?? undefined;

    // ApexChart options (cast chart.type to any to satisfy TS)
    const options: ApexOptions = {
        chart: {
            type: "candlestick" as any,
            toolbar: { show: true },
            animations: { enabled: false },
            zoom: { enabled: true },
        },
        xaxis: { type: "datetime" },
        yaxis: { tooltip: { enabled: true } },
        tooltip: {
            enabled: true,
            shared: true,
            theme: "dark", // fondo negro
            x: { format: "dd MMM yyyy HH:mm" },
            style: {
                fontSize: "12px",
                fontFamily: "inherit",
            },
        },
    };

    const latestPrice = useMemo(() => {
        if (!chartSeries || (chartSeries as any[]).length === 0) return undefined;
        const series = (chartSeries as any)[0].data;
        const last = series[series.length - 1];
        return last?.y?.[3] ?? undefined;
    }, [chartSeries]);
    // show full-page loading while initial requests are ongoing and no chart data yet
    if (loading && (!chartSeries || (chartSeries as any[]).length === 0)) {
        return <Loading className="h-[60vh]" />;
    }
    if (error) {
        return (
            <div className="text-center py-8 text-red-400">
                <NullResults text={error} />
            </div>
        );
    }
    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-4">
                <Button
                    onClick={() => navigate(-1)}
                    rounded="rounded"
                    className="p-2 w-fit! bg-[#333] text-[#d1d1d1] hover:bg-[#444]"
                    aria-label="Regresar"
                >
                    <FaChevronLeft />
                </Button>

                <div>
                    <h2 className="text-xl text-white font-semibold">{symbol || "—"}</h2>
                    <div className="flex items-baseline gap-4 mt-1">

                        <div className="text-2xl text-white font-bold">
                            {latestPrice !== undefined ? Number(latestPrice).toLocaleString() : "—"}
                        </div>
                        <div className={`text-sm ${percent !== undefined && Number(percent) >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {percent !== undefined ? `${Number(percent).toFixed(2)}%` : "—"}
                        </div>
                        <div className="text-sm text-gray-300 ml-4">Intervalo: {selectedInterval}</div>
                    </div>
                </div>
            </div>

            <div className="bg-[#0b1220] rounded-md p-4 min-h-80">
                {/* skeleton while no series but not loading */}
                {!chartSeries || (chartSeries as any[]).length === 0 ? (
                    <div className="animate-pulse w-full flex flex-col gap-3 py-8">
                        <div className="h-56 bg-linear-to-r from-[#0f1720] via-[#111214] to-[#0f1720] rounded" />
                        <div className="flex gap-2 mt-4 bg-black">
                            <div className="h-8 w-16 bg-[#222] rounded" />
                            <div className="h-8 w-12 bg-[#222] rounded" />
                            <div className="h-8 w-12 bg-[#222] rounded" />
                            <div className="h-8 flex-1 bg-[#222] rounded" />
                        </div>
                        <div className="text-center text-gray-400 py-2">Cargando gráfico...</div>
                    </div>
                ) : (
                    <ReactApexChart options={options} series={chartSeries as any} type="candlestick" height={420} />
                )}
            </div>

            <div className="mt-4 grid grid-cols-4 sm:grid-cols-8 gap-2">
                {INTERVALS.map((it) => (
                    <Button
                        key={it.value}
                        onClick={() => setSelectedInterval(it.value)}
                        rounded="rounded"
                        className={`py-2 px-3 text-sm font-semibold ${selectedInterval === it.value ? "bg-[#3e8e41] text-white" : "bg-[#333] text-[#d1d1d1] hover:bg-[#444]"}`}
                    >
                        {it.label}
                    </Button>
                ))}
            </div>
            <div className="basis-full order-99 flex justify-center mt-5">
                <Button type="button" rounded="rounded" className="py-2.5 px-5 w-fit!  cursor-pointer bg-[#3e8e41]" onClick={() => navigate(-1)}>
                    <FaChevronLeft />  Regresar
                </Button>
            </div>
        </div>
    );
};
