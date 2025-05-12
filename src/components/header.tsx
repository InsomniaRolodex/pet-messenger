import { JSX } from "react";

export function Header(): JSX.Element {
    return (
        <header className="main-header">
            <nav className="main-nav">
                <a className="main-nav__button" href="./index.html">Home</a>
                <span className="main-nav__logo-text">This is your Chat</span>
            </nav>
        </header>
    )
}