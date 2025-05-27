import React, { useEffect } from 'react';
import './App.scss';
import { Header } from './components/header';
import { ChatScreen } from './components/chat-screen';
import { Footer } from './components/footer';

import { fetchMessages } from './store/slice';
import { useAppDispatch, useAppSelector } from './types/state';
import LoginForm from './components/login-from';

function App() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(state => state.messagesData.isLoggedIn);

  useEffect(() => {
    if (loggedIn) {
      dispatch(fetchMessages());
    }
  }, [loggedIn, dispatch]);
  
  return (
    <div className="App">
      <Header />
      <ChatScreen />
      <Footer />
      {!loggedIn && <LoginForm/>}
    </div>
  );
}

export default App;
