import { useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getLinks, paramsURL, prettifyParams, } from "../utils/dateUtils"

export const usePageNavigate = () => {
    const navigate = useNavigate()
    const params = useParams()

    const handleNavigate = (url) => {
        if (url === window.location.pathname) {
            return
        }
        navigate(url)
    }

    const { year, month, day, week, today } = useMemo(() => {
        const links = getLinks(params)
        console.log(links, 'useMemo getLinks')
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
            console.log('next')
        },
        prev: () => {
            // const { year, month = 0, day = 0, week = 0 } = Object.fromEntries(Object.entries(params).map(item => [item[0], +item[1]]))

            // const date = new Date(year, month, day)
            // const last = year && month && day && week

            // const url = `/`
            // handleNavigate(url)
            console.log('prev')
        },
    }

    return navigators
}