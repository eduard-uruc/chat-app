import { fetchData } from './fetchData'

export const login = async (credentials) => {
    return await fetchData('auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const logout = async () => {
    return await fetchData('auth/logout');
}