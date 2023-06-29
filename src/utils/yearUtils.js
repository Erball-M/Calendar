import { MonthNames } from '../constans/dateNames'
import { yearRange } from '../constans/availableRanges'

export const getYearMonths = (year) => {
    const res = []
    for (let i = 0; i < MonthNames.length; i++) {
        const name = MonthNames[i]
        const daysCount = new Date(year, i + 1, 0).getDate()
        const weekDayStartNumber = new Date(year, i).getDay()
        const weekDayStart = weekDayStartNumber === 0 ? 6 : weekDayStartNumber - 1
        const days = []
        for (let j = 0; j < daysCount; j++) {
            const day = {
                date: j + 1,
                notices: [],
            }
            days.push(day)
        }
        res.push({
            name,
            days,
            daysCount,
            weekDayStart,
        })
    }
    return res
}

export const getDaysWithIndent = (month) => {
    const indentDays = []
    for (let i = 0; i < month.weekDayStart; i++) {
        indentDays.push(`indentDay${i}`)
    }
    return [...indentDays, ...month.days]
}

export const checkYearInRange = (year) => {
    const [from, to] = yearRange
    if (isNaN(year)) {
        return `/${new Date().getFullYear()}`
    } else if (year >= from && year <= to) {
        return false
    } else if (year < from) {
        return `/${from}`
    } else if (year > to) {
        return `/${to}`
    }
}