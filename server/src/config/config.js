module.exports = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chat_app",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
}
