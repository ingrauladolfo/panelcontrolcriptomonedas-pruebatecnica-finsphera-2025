import type { ReactNode } from "react";
export interface CardProps {
    data: any;
    children?: ReactNode;
    onDelete?: () => void;
    onView?: () => void;
    className?: string;
    type?: string;
    title?: string;
}
/* export interface CardDetailsProps { title?: string; user?: any; children: ReactNode; className?: string; }

export interface CardNormalProps {
    data: any;
    children?: ReactNode;
    onDelete?: () => void;
    onView?: () => void;
    className?: string;
} */