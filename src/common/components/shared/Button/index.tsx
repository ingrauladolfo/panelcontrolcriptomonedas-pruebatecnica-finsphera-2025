// Button.tsx
import type { ButtonProps } from '@/common/interfaces';
import type { FC } from 'react';

export const Button: FC<ButtonProps> = ({ disabled, children, onClick, type, href, className, ariaLabel }) => {
    /*     const classes = ['w-full', 'inline-flex', 'items-center', 'justify-center', 'py-2', 'px-4', 'rounded-md', 'text-base', 'font-bold', 'cursor-pointer', 'text-center', 'shadow-md', 'hover:shadow-lg', 'transition', 'duration-150', 'ease-in-out', className].filter(Boolean).join(' ');
     */
    if (href) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        );
    }

    return (
        <button disabled={disabled} type={type} className={`${className} `} aria-label={ariaLabel} onClick={onClick}>
            {children}
        </button>
    );
};