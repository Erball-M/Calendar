import { useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getWeekNumber } from "../utils/dateUtils"

export const usePageNavigate = () => {
    const navigate = useNavigate()
    const params = useParams()

    const checkedParams = useMemo(() => {
        const isCurrentYear = (new Date().getFullYear()) === parseInt(params.year)

        const handledMonth = isCurrentYear ? (new Date().getMonth() + 1) : parseInt(params.month) ?? 1 //1
        const isCurrentMonth = (new Date().getMonth() + 1) === handledMonth

        const handledDay = (isCurrentYear && isCurrentMonth) ? (new Date().getDate()) : parseInt(params.day) ?? 1 //1

        const year = params.year
        const month = handledMonth
        const day = handledDay

        return ({
            yearNavigate: () => {
                const url = `/${year}`
                if (url === window.location.pathname) return
                navigate(url)
            },
            monthNavigate: () => {
                const url = `/${year}/${month}`
                if (url === window.location.pathname) return
                navigate(url)
            },
            dayNavigate: () => {
                const url = `/${year}/${month}/${day}`
                if (url === window.location.pathname) return
                navigate(url)
            },
            weekNavigate: () => {
                const weekNumber = getWeekNumber({ year, month, day })
                const url = `/${year}/${month}/${day}/${weekNumber}`
                if (url === window.location.pathname) return
                navigate(url)
            },
            todayNavigate: () => {
                const date = new Date()
                const url = `/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
                if (url === window.location.pathname) return
                navigate(url)
            },
        })
    }, [params.year, params.month, params.day, params.week])

    return checkedParams
}