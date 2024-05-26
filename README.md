## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (version 12 or higher)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (version 4.4 or higher)

### Step-by-Step Guide

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app

2. After installation, start the MongoDB server:
    # On Windows
    "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe"
    
    # On macOS
    brew services start mongodb/brew/mongodb-community
    
    # On Linux
    sudo systemctl start mongod

3. Set up the backend:
    cd server
    npm install

4. Set up the frontend:
   cd ../client
   npm install

5. Start the backend server:
   Open a terminal window and navigate to the server directory, then start the server:
   cd server
   npm start

6. Start the frontend client:
   Open another terminal window, navigate to the client directory, then start the React application:
   cd client
   npm start



