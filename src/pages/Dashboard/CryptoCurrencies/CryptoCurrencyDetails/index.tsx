// DashboardCryptoCurrencyDetails.tsx
import { useCryptoStore } from "@/common/stores";
import { useLayoutEffect, useRef } from "react";
import { Button, Card } from "@/common/components";
import { FaCoins } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";

export const DashboardCryptoCurrencyDetails = () => {
    const navigate = useNavigate();
    const { search } = useLocation();

    const { fetchCripto, cripto } = useCryptoStore()
    const resolveSymbol = (): string | null => {
        const sp = new URLSearchParams(search);
        return sp.get('symbol');
    };
    const symbol = resolveSymbol();
    const fetchedRef = useRef(false);

    useLayoutEffect(() => {
        if (symbol && !fetchedRef.current) {
            fetchCripto(symbol);
            fetchedRef.current = true;
        }
    }, [symbol, fetchCripto]);
    console.log({ cripto })
    return (
        <div className="flex flex-wrap gap-6 items-start justify-center w-full box-border max-[980px]:flex-col max-[980px]:gap-4">
            <div className="grow shrink basis-0 max-w-140 min-w-70">
                {cripto && (
                    <>

                        <div className="flex items-center mb-5">
                            <FaCoins className="text-[24px] text-[#d1d1d1] mr-2.5 dashboard-users-icon" />
                            <h1 className="text-[24px] text-[#d1d1d1] m-0 ">Detalles de la moneda: {cripto.symbol}</h1>
                        </div>

                        <Card className="w-full" title="Detalles de la criptomoneda" data={cripto} type="detail">
                            <p className="mb-2.5 text-white">Precio: {cripto.priceChange}</p>
                            <p className="mb-2.5 text-white">Porcentaje de cambio: {cripto.priceChangePercent}%</p>
                            <p className="mb-2.5 text-white">Precio promedio: {cripto.weightedAvgPrice}</p>
                            <p className="mb-2.5 text-white">Precio de apertura: {cripto.openPrice}</p>
                            <p className="mb-2.5 text-white">Precio máximo: {cripto.highPrice}</p>
                            <p className="mb-2.5 text-white">Precio mínimo: {cripto.lowPrice}</p>
                            <p className="mb-2.5 text-white">Último precio: {cripto.lastPrice}</p>
                            <p className="mb-2.5 text-white">Volumen: {cripto.volume}</p>
                            <p className="mb-2.5 text-white">Volumen de cotización: {cripto.quoteVolume}</p>
                        </Card>
                    </>
                )}
            </div>
            <div className="basis-full order-99 flex justify-center mt-5 box-border max-[980px]:order-99 max-[980px]:basis-full ">
                <Button type="button" className="py-2.5 px-5 border-none rounded-[5px] cursor-pointer w-fit! bg-[#3e8e41]" onClick={() => navigate(-1)}                >
                    Regresar
                </Button>
            </div>
        </div>
    )
}