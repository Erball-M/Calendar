import { useMemo } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { getLinks } from "../utils/dateUtils"

export const usePageNavigate = (forcedScroll) => {
    const navigate = useNavigate()
    const params = useParams()
    const { pathname } = useLocation()

    const handleNavigate = (url) => {
        if (url === pathname) {
            return
        }
        navigate(url)
    }

    const { year, month, day, week, today, next, prev } = useMemo(() => {
        const links = getLinks(params)
        return links
    }, [params])

    const navigators = {
        yearNavigate: () => {
            handleNavigate(year)
        },
        monthNavigate: () => {
            handleNavigate(month)
        },
        dayNavigate: () => {
            handleNavigate(day)
        },
        weekNavigate: () => {
            handleNavigate(week)
        },
        todayNavigate: () => {
            handleNavigate(today)
        },
        next: () => {
            forcedScroll(true)
            handleNavigate(next)
        },
        prev: () => {
            forcedScroll(true)
            handleNavigate(prev)
        },
    }

    return navigators
}