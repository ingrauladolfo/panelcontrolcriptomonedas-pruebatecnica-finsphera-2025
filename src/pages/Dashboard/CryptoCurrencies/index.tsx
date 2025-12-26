// DashboardCryptoCurrencies.tsx
import { Card } from "@/common/components/Dashboard/Card"
import { useLanguage } from "@/common/context";
import { useCryptoStore } from "@/common/stores";
import { useLayoutEffect, useRef, useMemo } from 'react'
import { useNavigate } from "react-router";

export const DashboardCryptoCurrencies = () => {
    const { criptos, fetchCriptos, loading, error, handleViewCoin } = useCryptoStore()
    const navigate = useNavigate();
    const { lang } = useLanguage();

    const fetchCriptosRef = useRef(false)

    useLayoutEffect(() => {
        if (!fetchCriptosRef.current) {
            fetchCriptos()
            fetchCriptosRef.current = true
        }
    }, [fetchCriptos])

    const memoizedCriptos = useMemo(() => criptos, [criptos])

    if (loading) {
        return <div>Cargando...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="flex flex-col items-center p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {memoizedCriptos.map((cripto, index) => (
                    <Card key={index} type='normal' data={cripto} onView={() => handleViewCoin(navigate, cripto.symbol)} />
                ))}
            </div>
        </div>

    )
}

/*  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
           {memoizedCriptos.map((cripto, index) => (
               <Card key={index} type='normal' data={cripto} />
           ))}
       </div> */