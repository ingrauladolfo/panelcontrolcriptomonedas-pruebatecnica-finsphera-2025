// CardNormal.tsx
import type { CardProps } from '@/common/interfaces'
import { FaEye, FaTrash } from 'react-icons/fa6'

export const CardNormal = ({ data, children, onDelete, onView, className }: CardProps) => {
    return (
        <div className={`relative max-w-51.5 w-full border border-gray-200 rounded-lg overflow-hidden shadow-md p-4 box-border ${className}`}>
            <div className="flex flex-col items-center justify-center w-full p-4">
                <div className="flex flex-col items-center justify-center w-full mb-2">
                    <div className="flex flex-col items-center justify-center w-full">
                        <p className="text-sm text-center text-white wrap-break-word mb-0">{data?.symbol || data.name}</p>
                        <div className="w-16 h-16 flex justify-center items-center">
                            <img src={data.image || 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L3YxMTYxLWItMDQ0LWwyOHRmc3IzLmpwZw.jpg'} alt={data.name} className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
                {data.price && (
                    <p className="text-sm text-center text-white wrap-break-word mt-2">
                        Precio: {data.price}
                    </p>
                )}
                {children && <div className="w-full">{children}</div>}
                {(onDelete || onView) && (
                    <div className="flex justify-between items-center w-full mt-2">
                        {onDelete && (
                            <div className="flex items-center opacity-0 hover:opacity-100 transition-opacity duration-200 absolute bottom-4 left-4" /* onClick={handleDelete} */>
                                <FaTrash className='w-5 h-5 text-white' />
                                <span className="text-sm text-gray-500 ml-1">Borrar</span>
                            </div>
                        )}
                        {onView && (
                            <div className="flex items-center opacity-0 hover:opacity-100 transition-opacity duration-200 absolute bottom-4 right-4" onClick={onView}>
                                <FaEye className='w-5 h-5 text-white' />
                                <span className="text-sm text-gray-500 ml-1">Ver</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}