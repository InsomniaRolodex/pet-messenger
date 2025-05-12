import { Message, Messages } from "../types/message";

export const findCurrentMessages = (activeUser: Message, messages:Messages) => messages.filter((message) => message.name === activeUser.name);