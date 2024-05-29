# Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (version 12 or higher)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (version 4.4 or higher)

## Installation

1. Clone the repository:

   git clone https://github.com/eduard-uruc/chat-app.git
   cd chat-app/server

2. Install the dependencies:

   npm install

3. Create a `.env` file in the root directory of the server and add the content from .env.example

4. Start your MongoDB server if it is not already running.

5. Instal MongoDB Compass (https://www.mongodb.com/try/download/compass)

6. Open Compass and create the chat_app database with the following collections: messages, rooms, users

7. To populate your database with initial data, you can run the provided seed files.
   5.1 Make sure your MongoDB server is running.

   5.2 Run the seed scripts:
   `bash
npm run seed
`

### Running the Server

To start the server, use the following command:

```bash
npm start
```
