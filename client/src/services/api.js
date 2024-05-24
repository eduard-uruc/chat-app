import { fetchData } from './fetchData'
import { users, rooms } from '../constants/common'

export const getUsers = async () => {
    return await fetchData(users)
}

export const getUserDetails = async (userId) => {
    return await fetchData(`${users}/${userId}`)
}

export const getRooms = async () => {
    return await fetchData(rooms)
}