import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../SocketContext"

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
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={3}
        name="username"
        id="username"
        className="username__input"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button className="home__cta">SIGN IN</button>
    </form>
  )
}

export default Home
