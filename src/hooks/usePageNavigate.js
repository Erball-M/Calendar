import { useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"

export const usePageNavigate = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { year, month, day } = params

    const yearNavigate = useMemo(() => {
        const url = `/${year}`
        return () => navigate(url)
    }, [year])
    const monthNavigate = useMemo(() => {
        const isCurrentYear = new Date().getFullYear() === parseInt(year)
        const handledMonth = isCurrentYear ? (new Date().getMonth() + 1) : 1
        const url = `/${year}/${handledMonth}`
        return () => navigate(url)
    }, [month])
    const dayNavigate = useMemo(() => {
        const url = `/${year}/${month}/${day}`
        return () => navigate(url), [day]
    })
    // const weekNavigate = useMemo(() => {
    //     const url = 1
    //     return () => navigate(url)
    // }, [week])

    return { yearNavigate, monthNavigate, dayNavigate }
    //weekNavigate
}