import axios from "axios"

const fetchData = async (endpoint, params = {}) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const url = `${baseUrl}/${endpoint}`

  try {
    const response = await axios.get(url, { params })
    return response.data
  } catch (error) {
    if (error.response) {
      console.error(`Failed to fetch ${endpoint}:`, error.response.data.error)
      return []
    } else if (error.request) {
      console.error(`Error fetching ${endpoint}: No response received`)
      return []
    } else {
      console.error(`Error fetching ${endpoint}:`, error.message)
      return []
    }
  }
}

const updateData = async (endpoint, body = {}) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL
  const url = `${baseUrl}/${endpoint}`

  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    if (error.response) {
      console.error(`Failed to update ${endpoint}:`, error.response.data.error)
      throw new Error(error.response.data.error || "Failed to update data")
    } else if (error.request) {
      console.error(`Error updating ${endpoint}: No response received`)
      throw new Error("No response received")
    } else {
      console.error(`Error updating ${endpoint}:`, error.message)
      throw new Error(error.message)
    }
  }
}

export { fetchData, updateData }
