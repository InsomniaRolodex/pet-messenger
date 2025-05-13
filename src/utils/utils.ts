import { Message, Messages } from "../types/message";

export const findCurrentMessages = (activeUser: Message, messages:Messages) => {
    if (!activeUser) {
        activeUser = {
            postId: 0,
            id: 0,
            name: '',
            email: '',
            body: '',
        };
    }
    return messages.filter((message) => message.name === activeUser.name);
}