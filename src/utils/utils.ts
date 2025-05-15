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
    return messages.filter((message) => message.email === activeUser.email);
}

export const findUniqueUsers = (messages:Messages) => {
    const users: string[] = [];
    messages.map(message => users.push(message.email));

    const usersArr = [...new Set<string>(users)]
    return usersArr;
}