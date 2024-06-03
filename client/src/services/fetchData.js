const fetchData = async (endpoint, params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const baseUrl = process.env.REACT_APP_API_URL
  const url = `${baseUrl}/${endpoint}${queryString ? `?${queryString}` : ""}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      return data
    } else {
      console.error(`Failed to fetch ${endpoint}:`, data.error)
      return []
    }
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return []
  }
}

const updateData = async (endpoint, body = {}) => {
  const baseUrl = process.env.REACT_APP_API_URL
  const url = `${baseUrl}/${endpoint}`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (response.ok) {
      return data
    } else {
      console.error(`Failed to update ${endpoint}:`, data.error)
      throw new Error(data.error || "Failed to update data")
    }
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error)
    throw error
  }
}

export { fetchData, updateData }
