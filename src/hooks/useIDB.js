import { useState, useEffect } from 'react'
import { dbName, dbVersion, storeName, storeOptions } from '../constans/idbData'
import { getYearMonths } from '../utils/dateUtils'

export const useIDB = () => {
    const [IDB, setIDB] = useState(null)
    const [pendingData, setPendingData] = useState([])

    useEffect(() => {
        const idbRequest = window.indexedDB.open(dbName, dbVersion)

        idbRequest.onerror = () => console.log(idbRequest.error)
        idbRequest.onsuccess = () => {
            const db = idbRequest.result
            setIDB(db)
            db.onversionchange = () => {
                db.close()
                alert('База данных устарела, перезагрузите страницу!')
            }
        }

        idbRequest.onupgradeneeded = () => {
            const db = idbRequest.result
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, storeOptions)
            }
        }
    }, [])

    useEffect(() => {
        if (IDB && pendingData.length > 0) {
            setData(...pendingData)
            setPendingData([])
        }
    }, [IDB])

    async function setData(...data) {
        if (!IDB) {
            setPendingData(prevPendingData => [...prevPendingData, ...data])
            return
        }

        const transaction = IDB.transaction(storeName, 'readwrite')
        const store = transaction.objectStore(storeName)
        const promises = data.map(item => new Promise(resolve => {
            const request = store.put(item)
            request.onerror = request.onsuccess = () => resolve()
        }))
        await Promise.allSettled(promises)
    }

    async function getData(id) {
        if (!IDB) return

        const transaction = IDB.transaction(storeName, 'readwrite')
        const store = transaction.objectStore(storeName)
        const request = store.get(id)
        const promise = new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => {
                console.log(request.error)
                reject(request.error)
            }
        })
        const res = await promise
        return res
    }

    async function getAll() {
        if (!IDB) return

        const transaction = IDB.transaction(storeName, 'readonly')
        const store = transaction.objectStore(storeName)
        const request = store.getAll()
        const promise = new Promise((resolve, reject) => {
            request.onsuccess = () => {
                console.log('CHMO', request.result)
                resolve(request.result)
            }
            request.onerror = () => reject()
        })
        const res = await promise
        return res
    }

    return { IDB, setData, getData, getAll }
}