import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ChatPage from './pages/ChatPage'
import SocketProvider from './SocketContext'

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/chat' element={<ChatPage />}></Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App