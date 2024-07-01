# Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (version 12 or higher)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (version 4.4 or higher)

- Using Docker to run MongoDB might be a more straightforward solution
     1. Install Docker:
          ```bash
          sudo apt update
          sudo apt install -y docker.io
        
     3. Pull the MongoDB Docker image:
          ```bash
          sudo docker pull mongo
        
     4. Run MongoDB in a Docker container:
          ```bash
          sudo docker run --name mongodb -d -p 27017:27017 mongo

     5. Additional commands to manage MongoDB Docker container
          ```bash
          sudo docker ps               # check the running MongoDB container
          sudo docker start mongodb    # start the MongoDB container
          sudo docker stop mongodb     # stop the MongoDB container
          sudo docker logs mongodb     # view logs for the MongoDB container
          sudo docker rm -f mongodb    # remove the MongoDB container

 - [MongoDB Compass](https://www.mongodb.com/try/download/compass)
   ```bash
   wget https://downloads.mongodb.com/compass/mongodb-compass_1.43.3_amd64.deb  # download the MongoDB Compass .deb package:
   sudo dpkg -i mongodb-compass_1.43.3_amd64.deb                                # install the downloaded package
   sudo apt -f install                                                          # fix any dependency issues:



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eduard-uruc/chat-app.git
   cd chat-app/server

2. Install the dependencies:
   ```bash
   npm install

3. Create a `.env` file in the root directory of the server and add the content from .env.example

4. Start your MongoDB server if it is not already running.

5. Open Compass and create the `chat_app` database with the following collections:
   
         messages
         rooms
         users

6. To populate your database with initial data, you can run the provided seed files:
   
   ```bash
   npm run seed


## Running the Server
   To start the server, use the following command:
        
   ```bash
   npm start
   ```


## Login
To log in use `john` or `marie` usernames
