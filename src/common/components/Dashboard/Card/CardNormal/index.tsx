import type { CardProps } from '@/common/interfaces'
import { Modal, SendMessageModal } from '@/common/components/';
import { FaEye, FaTrash, FaChartLine, FaEnvelope, FaFileCsv } from 'react-icons/fa6'
import { useUsersStore } from '@/common/stores';
import { useState } from 'react';

export const CardNormal = ({ title, data, children, onDelete, onView, onViewGraph, onExport, onMessage, onClose, onConfirm, showModal, onSendMessage, className, dataType }: CardProps) => {
    // prefer passed user prop shape; fallback to "data"
    const user = data ?? (data as any)

    // internal fallback state when parent doesn't provide control props
    const [showSendMessageModal, setShowSendMessageModal] = useState(false);
    const { handleSendMessage } = useUsersStore()
    // store actions (used if parent doesn't provide handlers)





    const handleOnSendMessage = (message: { title: string; content: string }) => {
        const userId = user?.login?.uuid ?? user?.id?.value ?? user?.email ?? '';
        if (!userId) {
            console.warn('CardNormal: no user id to send message');
            return;
        }
        handleSendMessage(userId, message);
        setShowSendMessageModal(false);
    };


    return (
        <div className={`relative max-w-51.5 w-full border border-gray-200 rounded-lg overflow-hidden shadow-md p-4 box-border ${className}`}>
            <div className="flex flex-col items-center justify-center w-full p-4 m-4">
                <div className="flex flex-col items-center justify-center w-full mb-2">
                    <div className="flex flex-col items-center justify-center w-full">
                        <p className="text-sm text-center text-white wrap-break-word mb-1">{data?.symbol || `${data?.name?.title} ${data?.name?.first} ${data?.name?.last}`}</p>
                        <div className="w-16 h-16 flex justify-center items-center">
                            <img src={data?.picture?.medium
                                || 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3YxMTYxLWItMDQ0LWwyOHRmc3IzLmpwZw.jpg'
                            } alt={data?.name?.first ?? 'avatar'} className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
                {data?.price && (
                    <p className="text-sm text-center text-white wrap-break-word mt-2">
                        {title}: {data.price}
                    </p>
                )}
                {children && <div className="w-full">{children}</div>}

                {(onDelete || onView || onViewGraph || onExport || onMessage) && (
                    <div className="flex justify-between items-center w-full mt-2 cursor-pointer">
                        {onMessage && (
                            <div
                                className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute top-4 left-4 opacity-100 sm:opacity-100"
                                onClick={() => setShowSendMessageModal(true)}
                            >
                                <FaEnvelope className="w-5 h-5 text-white" />
                                <span className="text-sm text-white ml-1">Mensaje</span>
                            </div>
                        )}

                        {onExport && (
                            <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute top-4 right-4 opacity-100 sm:opacity-100 " onClick={onExport}>
                                <FaFileCsv className='w-5 h-5 text-white' />
                                <span className="text-sm text-white ml-1">Exportar</span>
                            </div>
                        )}
                        {dataType === 'user' && onDelete && (
                            <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute bottom-4 left-4 opacity-100 sm:opacity-100" onClick={onDelete}>
                                <FaTrash className='w-5 h-5 text-white' />
                                <span className="text-sm text-white ml-1">Borrar</span>
                            </div>
                        )}
                        {dataType === 'crypto' && onViewGraph && (
                            <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute bottom-4 right-4 opacity-100 sm:opacity-100" onClick={onViewGraph}>
                                <FaChartLine className='w-5 h-5 text-white' />
                                <span className="text-sm text-white ml-1">Ver gráfica</span>
                            </div>
                        )}
                        {dataType === 'user' && onView && (
                            <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute bottom-4 right-4 opacity-100 sm:opacity-100" onClick={onView}>
                                <FaEye className='w-5 h-5 text-white' />
                                <span className="text-sm text-white ml-1">Ver</span>
                            </div>
                        )}
                        {dataType === 'crypto' && onView && (
                            <div className="flex items-center md:opacity-0 md:hover:opacity-100 transition-opacity duration-200 absolute bottom-4 left-4 opacity-100 sm:opacity-100" onClick={onView}>
                                <FaEye className='w-5 h-5 text-white' />
                                <span className="text-sm text-white ml-1">Ver</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Delete confirmation modal (shown per-card when showModal=true) */}
            {showModal && dataType === 'user' && (
                <Modal
                    message={`Seguro que quieres borrar el id ${data?.login?.uuid} (${data?.name?.title} ${data?.name?.first} ${data?.name?.last})?`}
                    onClose={onClose}
                    onConfirm={onConfirm}
                    confirmText="Sí"
                    cancelText="No"
                />
            )}

            {/* Send message modal */}
            {showSendMessageModal && (
                <SendMessageModal user={user} onClose={() => setShowSendMessageModal(false)} onSendMessage={handleOnSendMessage} />
            )}
        </div>
    )
}

{/*  {showModal && (
                <Modal
                    message={`Seguro que quieres borrar el id ${user.login.uuid} (${title})?`}
                    onClose={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                    confirmText="Sí"
                    cancelText="No"
                />
            )}
            {showSendMessageModal && (
                <SendMessageModal user={user} onClose={() => setShowSendMessageModal(false)} onSendMessage={onSendMessage} />
            )} */}