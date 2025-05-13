
import { JSX } from "react";
import { State, useAppDispatch, useAppSelector } from "../types/state";
import { setActiveChat } from "../store/slice";

export function ChatUsers(): JSX.Element {
    const messagesData = useAppSelector((state: State) => state.messagesData.messages);
    const isActiveDialog = useAppSelector((state: State) => state.messagesData.currentDialogue);
    const dispatch = useAppDispatch();

    return (
        <section className="page-section users-section">
            <aside className="users-section__container ">
                <ul className="users-section__list">
                    {messagesData.map((messageObj) =>
                        <li className="users-section__element">
                            <button type='button' onClick={() => dispatch(setActiveChat(messageObj.name))} className={`"users-section__name" ${isActiveDialog ? 'users-section__name--current' : ''}`}>{messageObj.name}</button>
                        </li>
                    )}
                </ul>
            </aside>
        </section>

    )
}