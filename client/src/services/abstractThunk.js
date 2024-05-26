import { createAsyncThunk } from "@reduxjs/toolkit"

const createFetchThunk = (typePrefix, fetchFunc) => {
  return createAsyncThunk(typePrefix, async (params) => {
    const response = await fetchFunc(params)
    return response
  })
}

export default createFetchThunk
