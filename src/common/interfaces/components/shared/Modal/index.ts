/* The code snippet you provided is defining TypeScript interfaces in a file named `interfaces.ts`.
Interfaces in TypeScript are used to define the structure of objects. */
// interfaces.ts
export interface ModalProps {
    message: string;
    onClose?: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}
export interface SendMessageModalProps {
    user: {
        login: {
            uuid: string;
        };
        name: {
            first: string;
            last: string;
        };
    };
    onClose: () => void;
    onSendMessage?: (message: { title: string; content: string }) => void;

}

export interface Message {
    title: string;
    content: string;
    date: any;
}