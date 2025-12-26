// Button.tsx
import type { ButtonProps } from '@/common/interfaces';
import type { FC } from 'react';

export const Button: FC<ButtonProps> = ({ children, onClick, type, href, className }) => {
    const classes = ['w-full', 'inline-flex', 'items-center', 'justify-center', 'py-2', 'px-4', 'rounded-md', 'text-base', 'font-bold', 'cursor-pointer', 'text-center', 'shadow-md', 'hover:shadow-lg', 'transition', 'duration-150', 'ease-in-out', className].filter(Boolean).join(' ');

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={classes} onClick={onClick}>
            {children}
        </button>
    );
};