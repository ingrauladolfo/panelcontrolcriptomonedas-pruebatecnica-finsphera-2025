import type { Message } from "@/common/interfaces";

export type MessagesMap = Record<string, Message[]>;
export interface SendMessageState {
    messages: MessagesMap;
    sendMessage: (userId: string, message: Message) => void;
    getMessages: (userId: string) => Message[];
    setMessagesForUser: (userId: string, msgs: Message[]) => void;
}