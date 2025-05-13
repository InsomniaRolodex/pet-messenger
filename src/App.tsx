import React, { useEffect } from 'react';
import './App.scss';
import { Header } from './components/header';
import { ChatScreen } from './components/chat-screen';
import { Footer } from './components/footer';

import { fetchMessages } from './store/slice';
import { useAppDispatch } from './types/state';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);
  
  return (
    <div className="App">
      <Header />
      <ChatScreen />
      <Footer />
    </div>
  );
}

export default App;
