import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: {},
})

export const { } = dataSlice.actions
export default dataSlice