import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../SocketContext'

const Home = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const { socket, setUserName: setSocketUserName } = useSocket()

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        setSocketUserName(userName);

        if (socket) {
            socket.emit('newUser', { userName, socketID: socket.id });
        }

        navigate('/chat');
    };
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button className="home__cta">SIGN IN</button>
        </form>
    );
};

export default Home;