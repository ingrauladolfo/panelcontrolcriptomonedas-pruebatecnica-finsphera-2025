/* This code snippet is defining an interface named `CardProps` in a TypeScript file located at
`/common/interfaces/index.ts` or wherever it may be. The `CardProps` interface specifies the shape
of props that a component named `Card` expects to receive. */
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
    onConfirm?: () => void;
    onMessage?: true;
    className?: string;
    type?: string;
    title?: string;
    dataType?: string;
    showModal?: boolean;
    onViewHeatmap?: (data: any) => void

}