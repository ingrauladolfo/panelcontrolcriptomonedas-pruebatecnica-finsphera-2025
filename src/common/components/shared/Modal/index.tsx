// Modal.tsx
import type { ModalProps } from '@/common/interfaces';
import '@/common/styles/components/shared/Modal/index.css';
import type { FC } from 'react';
import { Button } from '@/common/components';
export const Modal: FC<ModalProps> = ({ message, onClose, onConfirm, confirmText, cancelText }) => {
    return (
        <div className="fixed top-0 left-0 size-full bg-[#00000080] flex justify-center items-center p-5 box-border z-1000">
            <div className="bg-[#333333] p-5 rounded-[10px] shadow-[0 0 10px rgba(0, 0, 0, 0.2)] w-full max-w-100 text-white">
                <p className='text-[16px] mb-5 text-center'>{message}</p>

                <div className="flex gap-4 justify-between">
                    {cancelText && (
                        <Button
                            className="w-auto min-w-30 py-[0.6rem] px-[1.2rem] rounded-lg transform-none cursor-pointer hover:-translate-y-px only:my-0 only:mx-auto first:mr-auto last:ml-auto  opacity-[0.9] bg-[#6C7A89] text-[#FFFFFF]"
                            onClick={onClose}
                        >
                            {cancelText}
                        </Button>
                    )}

                    {confirmText && (
                        <Button
                            className="w-auto min-w-30 py-[0.6rem] px-[1.2rem] rounded-lg transform-none cursor-pointer hover:-translate-y-px only:my-0 only:mx-auto first:mr-auto last:ml-auto shadow-inner shadow-white/8 bg-[#1ABC9C] text-[#212121]"
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
