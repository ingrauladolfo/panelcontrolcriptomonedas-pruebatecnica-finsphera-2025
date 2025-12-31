import type { CardProps } from '@/common/interfaces'
import { Modal, SendMessageModal } from '@/common/components/'
import { FaEye, FaTrash, FaChartLine, FaEnvelope, FaFileCsv, FaX } from 'react-icons/fa6'
import { FcHeatMap } from 'react-icons/fc'
import { useUsersStore } from '@/common/stores'
import { useRef, useState, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLanguage } from '@/common/context'
import { DashboardCryptoHeatmap } from '@/pages'

export const CardNormal = ({
    title,
    data,
    children,
    onDelete,
    onView,
    onViewGraph,
    onExport,
    onMessage,
    onClose,
    onConfirm,
    showModal,
    className,
    dataType,
    onViewHeatmap,
}: CardProps) => {
    const user = data ?? (data as any)
    const [showSendMessageModal, setShowSendMessageModal] = useState(false)
    const [showHeatmapModal, setShowHeatmapModal] = useState(false)
    const { handleSendMessage } = useUsersStore()
    const navigate = useNavigate()
    const { lang } = useLanguage()
    const prevUrlRef = useRef<string | null>(null)

    /*     const symbolForThisCard = String((data as any)?.symbol || '').toUpperCase()
     */
    useLayoutEffect(() => {
        const handleBeforeUnload = () => {
            setShowHeatmapModal(false)
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [])
    // detectar cambios con back/forward


    const handleOnSendMessage = (message: { title: string; content: string }) => {
        const userId = user?.login?.uuid ?? user?.id?.value ?? user?.email ?? ''
        if (!userId) {
            console.warn('CardNormal: no user id to send message')
            return
        }
        handleSendMessage(userId, message)
        setShowSendMessageModal(false)
    }

    const openHeatmapModal = (symbol: string) => {
        if (typeof window !== 'undefined') {
            prevUrlRef.current = window.location.pathname + window.location.search
            const newUrl = `/dashboard/heatmaps?symbol=${encodeURIComponent(symbol)}`
            window.history.pushState({}, '', newUrl)
        }
        setShowHeatmapModal(true)
    }

    const closeHeatmapModal = () => {
        setShowHeatmapModal(false)
        if (typeof window !== 'undefined') {
            const restore = prevUrlRef.current ?? '/dashboard/cryptocurrencies'
            window.history.replaceState({}, '', restore)
            prevUrlRef.current = null
        }
    }

    const handleViewHeatmapLocal = () => {
        if (typeof onViewHeatmap === 'function') {
            onViewHeatmap(data)
            return
        }

        const symbol = (data as any)?.symbol
        if (symbol && String(symbol).trim() !== '') {
            openHeatmapModal(String(symbol))
            return
        }

        const base = lang === 'es' ? '/dashboard/mapa-calor' : '/dashboard/heatmap'
        if (symbol) {
            navigate(`${base}?symbol=${encodeURIComponent(symbol)}`)
        } else {
            navigate(base)
        }
    }

    return (
        <>
            <div className={`relative max-w-51.5 w-full border border-gray-200 rounded-lg overflow-hidden shadow-md p-4 box-border ${className}`}>
                <div className="flex flex-col items-center justify-center w-full p-4 m-4">
                    <div className="flex flex-col items-center justify-center w-full mb-2">
                        <div className="flex flex-col items-center justify-center w-full">
                            <p className="text-sm text-center text-white wrap-break-word mb-1">
                                {data?.symbol || `${data?.name?.title} ${data?.name?.first} ${data?.name?.last}`}
                            </p>
                            <div className="w-16 h-16 flex justify-center items-center">
                                <img
                                    src={
                                        data?.picture?.medium ||
                                        'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3YxMTYxLWItMDQ0LWwyOHRmc3IzLmpwZw.jpg'
                                    }
                                    alt={data?.name?.first ?? 'avatar'}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {data?.price && (
                        <p className="text-sm text-center text-white wrap-break-word mt-2">
                            {title}: {data.price}
                        </p>
                    )}

                    {children && <div className="w-full">{children}</div>}

                    {(onDelete || onView || onViewGraph || onExport || onMessage || dataType === 'crypto') && (
                        <div className="flex justify-between items-center w-full mt-2 cursor-pointer">
                            {onMessage && (
                                <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute top-4 left-4 opacity-100 sm:opacity-100" onClick={() => setShowSendMessageModal(true)}>
                                    <FaEnvelope className="w-5 h-5 text-white" />
                                    <span className="text-sm text-white ml-1">Mensaje</span>
                                </div>
                            )}

                            {onExport && (
                                <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute top-4 right-4 opacity-100 sm:opacity-100" onClick={onExport}>
                                    <FaFileCsv className="w-5 h-5 text-white" />
                                    <span className="text-sm text-white ml-1">Exportar </span>
                                </div>
                            )}

                            {dataType === 'user' && onDelete && (
                                <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute bottom-4 left-4 opacity-100 sm:opacity-100" onClick={onDelete}>
                                    <FaTrash className="w-5 h-5 text-white" />
                                    <span className="text-sm text-white ml-1">Borrar</span>
                                </div>
                            )}

                            {dataType === 'crypto' && onViewGraph && (
                                <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute bottom-4 right-4 opacity-100 sm:opacity-100" onClick={onViewGraph}>
                                    <FaChartLine className="w-5 h-5 text-white" />
                                    <span className="text-sm text-white ml-1">Gráfica</span>
                                </div>
                            )}

                            {dataType === 'crypto' && (
                                <div
                                    className="flex items-center gap-1 md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute top-4 right-4 opacity-100 sm:opacity-100"
                                    onClick={handleViewHeatmapLocal}
                                    role="button"
                                    aria-label="Ver mapa de calor"
                                >
                                    <FcHeatMap className="w-5 h-5" />
                                    <span className="text-sm text-white">Mapa de calor</span>
                                </div>
                            )}

                            {dataType === 'user' && onView && (
                                <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute bottom-4 right-4 opacity-100 sm:opacity-100" onClick={onView}>
                                    <FaEye className="w-5 h-5 text-white" />
                                    <span className="text-sm text-white ml-1">Detalles</span>
                                </div>
                            )}

                            {dataType === 'crypto' && onView && (
                                <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute bottom-4 left-4 opacity-100 sm:opacity-100" onClick={onView}>
                                    <FaEye className="w-5 h-5 text-white" />
                                    <span className="text-sm text-white ml-1">Detalles</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {showModal && dataType === 'user' && (
                    <Modal
                        message={`Seguro que quieres borrar el id ${data?.login?.uuid} (${data?.name?.title} ${data?.name?.first} ${data?.name?.last})?`}
                        onClose={onClose}
                        onConfirm={onConfirm}
                        confirmText="Sí"
                        cancelText="No"
                    />
                )}

                {showSendMessageModal && (
                    <SendMessageModal user={user} onClose={() => setShowSendMessageModal(false)} onSendMessage={handleOnSendMessage} />
                )}
            </div>

            {/* Heatmap modal interno: solo muestra un símbolo (pasamos objeto { symbol }) */}
            {showHeatmapModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="relative w-full max-w-4xl h-auto overflow-auto rounded-lg bg-gray-900 p-4 " role="dialog" aria-modal="true" aria-label="Mapa de calor">
                        <button className="absolute top-3 right-3 text-white bg-gray-800 rounded px-2 py-1" onClick={closeHeatmapModal} aria-label="Cerrar mapa de calor">
                            <FaX />
                        </button>

                        <div className="mt-6">
                            <DashboardCryptoHeatmap data={{ symbol: String((data as any)?.symbol) }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
