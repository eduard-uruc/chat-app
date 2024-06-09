import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../context/SocketContext"

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState("")
  const { socket, setUserName } = useSocket()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem("userName", user)
    setUserName(user)

    if (socket) {
      socket.emit("newUser", { userName: user, socketID: socket.id })
    }

    navigate("/chat")
  }
  return (
    <form className="home-container" onSubmit={handleSubmit}>
      <h2 className="home-header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={3}
        name="username"
        id="username"
        className="username-input"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button className="home-cta">SIGN IN</button>
    </form>
  )
}

export default Home
