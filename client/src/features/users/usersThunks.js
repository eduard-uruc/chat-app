import { fetchData } from "../../services/fetchData"
import createFetchThunk from "../../services/abstractThunk"
import { API_ENDPOINTS } from "../../constants/apiEndpoints"
import { FETCH_USERS } from "../../constants/actionTypes"

export const fetchUsers = createFetchThunk(FETCH_USERS, ({ currentUser }) =>
  fetchData(API_ENDPOINTS.USERS, { currentUser })
)
