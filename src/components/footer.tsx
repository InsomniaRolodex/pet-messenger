import { JSX, useState } from "react";
import { useAppDispatch } from "../types/state";
import { sendMessage } from "../store/slice";

export function Footer (): JSX.Element {
    const [text, setText] = useState('');
    const dispatch = useAppDispatch();

    const messageSubmit = () => {
        dispatch(sendMessage(text));
        setText('')
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <footer className="page-footer">
            <form className="message-form" onSubmit={messageSubmit}>
                <label className="message-form__element text-input text-input_label" htmlFor="message">Ваше сообщение:</label>
                <input className="message-form__element text-input text-input_input" id="message" name="message-input" type="text" value={text} onChange={handleInput} required/>
                <button className="message-form__element message-form__button button" type="submit">Отправить</button>
            </form>
        </footer>
    )
}