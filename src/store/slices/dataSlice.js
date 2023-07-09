import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { dbName, dbVersion, storeName, storeOptions } from '../../constans/idbData'

export const idbOpen = createAsyncThunk('data/idbOpen',
    async () => {
        const idb = await new Promise((resolve, reject) => {
            const idbRequest = window.indexedDB.open(dbName, dbVersion)

            idbRequest.onerror = () => reject(idbRequest.error)
            idbRequest.onsuccess = () => {
                const db = idbRequest.result

                db.onversionchange = () => {
                    db.close()
                    alert('База данных устарела, перезагрузите страницу!')
                }
                resolve(db)
            }
            idbRequest.onupgradeneeded = () => {
                const db = idbRequest.result
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName, storeOptions)
                }
            }
        })
        window[dbName + 'IDB'] = idb

        const transaction = idb.transaction(storeName, 'readonly')
        const store = transaction.objectStore(storeName)
        const request = store.getAll()
        const data = await new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
        })
        return data
    })

const initialState = {
    idbLoading: true,
    idbError: null,
    months: [],
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addNotice: (state, action) => {
            // state.months = [...state.months,action.payload]
            state.months.push(action.payload)

            const IDB = window[dbName + 'IDB']
            const transaction = IDB.transaction(storeName, 'readwrite')
            const store = transaction.objectStore(storeName)
            store.put(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(idbOpen.pending, (state) => {
                state.idbLoading = true
            })
            .addCase(idbOpen.fulfilled, (state, action) => {
                state.months = action.payload
                state.idbLoading = false
            })
            .addCase(idbOpen.rejected, (state, action) => {
                state.idbError = action.error
                state.idbLoading = false
            })
    },
})

export const {
    addNotice,
} = dataSlice.actions
export default dataSlice