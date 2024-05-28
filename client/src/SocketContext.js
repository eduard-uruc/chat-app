import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react"
import io from "socket.io-client"

const SocketContext = createContext()

export const useSocket = () => useContext(SocketContext)

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  )

  useEffect(() => {
    const newSocket = io(
      process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:4000"
    )

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id)
      if (userName) {
        newSocket.emit("identify", userName)
      }
    })

    newSocket.on("reconnect", () => {
      console.log("Socket reconnected:", newSocket.id)
      if (userName) {
        newSocket.emit("identify", userName)
      }
    })

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err)
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [userName])

  const contextValue = useMemo(
    () => ({
      socket,
      setUserName,
    }),
    [socket]
  )

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
