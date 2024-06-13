import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// export const fetchMessages = createAsyncThunk(
//   "chat/fetchMessages",
//   async () => {
//     const response = await api.get("/messages")
//     return response.data
//   }
// )

export const uploadMessage = createAsyncThunk(
  "chat/uploadMessage",
  async ({ message, file, from, to }, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_APP_API_URL
    const url = `${baseUrl}/upload`

    const formData = new FormData()
    formData.append("from", from)
    formData.append("to", to)
    formData.append("message", message)
    if (file) {
      formData.append("file", file)
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      )
    }
  }
)
