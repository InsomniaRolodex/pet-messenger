import { JSX } from "react";
import { useAppDispatch, useAppSelector } from "../types/state";
import { Link } from "react-router-dom";
import { logoutAction } from "../store/slice";
import { UserOutlined } from "@ant-design/icons";

export function Header(): JSX.Element {
    const dispatch = useAppDispatch();
    const name = useAppSelector(state => state.messagesData.email);

    const logout = () => {
        dispatch(logoutAction())
    }
    return (
        <header className="main-header">
            <nav className="main-nav">
                <Link className="main-nav__button" to="./index.html">Home</Link>
                <span className="main-nav__logo-text">This is your Chat</span>
                <button className="main-nav__name" type="button" onClick={logout}>{name} <UserOutlined /> | Logout</button>
            </nav>
        </header>
    )
}