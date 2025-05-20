import { Message, Messages } from "../types/message";

export const findCurrentMessages = (activeUser: Message | null, messages:Messages) => {
    if (!activeUser) {
        return;
    }
    return messages.filter((message) => message.email === activeUser.email);
}

export const findUniqueUsers = (messages:Messages) => {
    const users: string[] = [];
    messages.map(message => users.push(message.email));

    const usersArr = [...new Set<string>(users)]
    return usersArr;
}