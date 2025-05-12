
import { JSX } from "react";
import { State, useAppSelector } from "../types/state";

export function ChatUsers(): JSX.Element {
    const messagesData = useAppSelector((state: State) => state.messagesData.messages)
    const isActiveDialog = useAppSelector((state: State) => state.messagesData.currentDialogue)

    return (
        <section className="page-section users-section">
            <aside className="users-section__container ">
                <ul className="users-section__list">
                    {messagesData.map((messageObj) =>
                        <li className="users-section__element">
                            <button type='button' className={`"users-section__name" ${isActiveDialog ? 'users-section__name--current' : ''}`}>{messageObj.name}</button>
                        </li>
                    )}
                </ul>
            </aside>
        </section>

    )
}