import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async () => {
        const response = await api.get('/messages')
        return response.data
    }
)