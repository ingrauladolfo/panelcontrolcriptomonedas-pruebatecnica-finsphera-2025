// /common/interfaces/index.ts (o donde esté)
import type { ReactNode } from "react";
export interface CardProps {
    data: any;
    children?: ReactNode;
    onDelete?: () => void;
    onView?: () => void;
    onViewGraph?: () => void;
    onExport?: () => void;
    onClose?: () => void;
    onSendMessage?: (message: { title: string; content: string }) => void;
    onConfirm?: () => void;
    onMessage?: true;
    className?: string;
    type?: string;
    title?: string;
    dataType?: string;
    showModal?: boolean;
}

/* export interface CardDetailsProps { title?: string; user?: any; children: ReactNode; className?: string; }

export interface CardNormalProps {
    data: any;
    children?: ReactNode;
    onDelete?: () => void;
    onView?: () => void;
    className?: string;
} */