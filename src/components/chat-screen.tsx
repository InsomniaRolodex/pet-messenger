import { JSX } from "react";
import {State, useAppSelector} from '../types/state'
import { ChatUsers } from "./chat-users";
import { findCurrentMessages } from "../utils/utils";
import uniqid from 'uniqid';

export function ChatScreen (): JSX.Element {
    const messagesData = useAppSelector((state: State) => state.messagesData.messages);
    const currentChat = useAppSelector((state: State) => state.messagesData.currentDialogue);
    const currentMessages = findCurrentMessages(currentChat, messagesData);

    return (
        <main className="main-container">
            <h1 className="visually-hidden">Чат</h1>
            <ChatUsers />
            <section className="page-section chat-section">
                <div className="chat-section__container ">
                    {currentMessages && currentMessages.map((messageObj) =>
                        <div className={`${messageObj.id === -1 ? 'chat-section__element--own' : ''} chat-section__element`} key={uniqid()}>
                            <span className="chat-section__name">{messageObj.name}</span>
                            <p className="chat-section__text">{messageObj.body}</p>
                        </div>)}
                    {!currentMessages && <span className="chat-section__empty">Здесь будут ваши сообщения</span>}
                </div>
            </section>
        </main>
    )
}