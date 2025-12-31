/* This TypeScript code snippet is defining an interface named `ButtonProps`. This interface specifies
the props that can be passed to a button component. Here's a breakdown of the properties defined in
the `ButtonProps` interface: */
import type { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: 'submit' | 'reset' | 'button';
    href?: string;
    className?: string;
    ariaLabel?: string
    disabled?: any;
    rounded?: string
}