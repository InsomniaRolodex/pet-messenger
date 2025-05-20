
import { JSX } from "react";
import { State, useAppDispatch, useAppSelector } from "../types/state";
import { setActiveChat } from "../store/slice";
import { findUniqueUsers } from "../utils/utils";
import uniqid from 'uniqid';

export function ChatUsers(): JSX.Element {
    const messagesData = useAppSelector((state: State) => state.messagesData.messages);
    const activeDialog = useAppSelector((state: State) => state.messagesData.currentDialogue?.email);
    const dispatch = useAppDispatch();

    const uniqueUsers = findUniqueUsers(messagesData);


    return (
        <section className="page-section users-section">
            <aside className="users-section__container ">
                <ul className="users-section__list">
                    {uniqueUsers.map((user) =>
                        <li className="users-section__element" key={uniqid()}>
                            <button type='button' onClick={() => dispatch(setActiveChat(user))} className={`users-section__name ${activeDialog === user ? 'users-section__name--current' : ''}`}>{user}</button>
                        </li>
                    )}
                </ul>
            </aside>
        </section>

    )
}