import { JSX } from "react";

export function Footer (): JSX.Element {
    return (
        <footer className="page-footer">
            <form className="message-form">
                <label className="message-form__element text-input text-input_label" htmlFor="message">Ваше сообщение:</label>
                <input className="message-form__element text-input text-input_input" id="message" name="message-input" type="text" />
                <button className="message-form__element message-form__button button" type="submit">Отправить</button>
            </form>
        </footer>
    )
}