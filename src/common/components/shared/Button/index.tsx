/**
 * The `Button` component is a TypeScript React functional component that renders either an anchor
 * element or a button element based on the presence of a `href` prop.
 * @param  - The `Button` component accepts the following props:
 * @returns The `Button` component is being returned. It is a functional component that renders either
 * an `<a>` element or a `<button>` element based on the presence of the `href` prop. The component
 * accepts props such as `disabled`, `children`, `onClick`, `type`, `href`, `className`, `ariaLabel`,
 * and `rounded`. The component's structure and styling are defined based
 */
import type { ButtonProps } from '@/common/interfaces'
import { type FC } from 'react'

export const Button: FC<ButtonProps> = ({ disabled, children, onClick, type, href, className, ariaLabel, rounded = 'rounded-[5px]' }) => {
    return (
        href ?
            <a href={href} className={`w-full inline-flex items-center justify-center p-[clamp(0.5rem,1.6vw,0.9rem)] ${rounded} text-[16px] text-center cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-[background-color_.15s_ease,transform_.08s_ease] font-bold no-underline text-inherit hover:underline ${className}`}>
                {children}
            </a>
            :
            <button
                disabled={disabled}
                type={type}
                className={`w-full inline-flex items-center justify-center p-[clamp(0.5rem,1.6vw,0.9rem)] ${rounded} text-[16px] text-center cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-[background-color_.15s_ease,transform_.08s_ease] font-bold ${className}`}
                aria-label={ariaLabel}
                onClick={onClick}
            >
                {children}
            </button>
    );
}