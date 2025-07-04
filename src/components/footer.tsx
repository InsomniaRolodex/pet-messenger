import { JSX, useState } from "react";
import { useAppDispatch, useAppSelector } from "../types/state";
import { sendMessage } from "../store/slice";
import { SendOutlined } from "@ant-design/icons";

export function Footer(): JSX.Element {
    const [text, setText] = useState('');
    const dispatch = useAppDispatch();
    const isChatActive = useAppSelector(state => state.messagesData.currentDialogue);
    const isSending = useAppSelector(state => state.messagesData.isLoading);

    const messageSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text) {
            dispatch(sendMessage(text));
            setText('');
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <footer className="page-footer">
            <form className="message-form" onSubmit={messageSubmit}>
                <label className="message-form__label text-input text-input_label visually-hidden" htmlFor="message">Ваше сообщение:</label>
                <input className="message-form__input text-input text-input_input" id="message" name="message-input" type="text"
                    value={text}
                    onChange={handleInput}
                    required
                    disabled={!isChatActive || isSending}
                    placeholder="Напишите что-нибудь"
                />
                <button className="message-form__button button" type="submit"
                    disabled={!isChatActive}>
                    <SendOutlined className="message-form__icon" />
                    <span className="visually-hidden">Отправить</span>
                </button>
            </form>
        </footer>
    )
}