import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ChatPage from "./pages/ChatPage"
import SocketProvider from "./context/SocketContext"
import ThemeProvider from "./context/ThemeContext"

function App() {
  return (
    <ThemeProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/chat" element={<ChatPage />}></Route>
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </ThemeProvider>
  )
}

export default App
