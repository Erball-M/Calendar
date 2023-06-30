import { MonthNames } from '../constans/dateNames'
import { YearRange, MonthRange } from '../constans/availableRanges'


export function getYearMonths(year) {
    const y = parseInt(year)
    const res = []
    for (let i = 0; i < MonthNames.length; i++) {
        res.push(getMonthDays(y, i))
    }
    return res
}

export function getMonthDays(year, month) {
    const name = MonthNames[month]
    const daysCount = new Date(year, month + 1, 0).getDate()
    const weekDayStartNumber = new Date(year, month).getDay()
    const weekDayStart = weekDayStartNumber === 0 ? 6 : weekDayStartNumber - 1
    const days = []
    for (let i = 0; i < daysCount; i++) {
        const day = {
            date: i + 1,
            notices: [],
        }
        days.push(day)
    }
    return ({
        name,
        days,
        daysCount,
        indent: weekDayStart,
    })
}

export function getMonthDaysWithIndent(month) {
    const indentDays = []
    for (let i = 0; i < month.indent; i++) {
        indentDays.push(`indentDay${i}`)
    }
    return [...indentDays, ...month.days]
}

export function checkDateInRange(params) {
    const pathname = window.location.pathname

    const correctedParams = []
    if (params.year) {
        const yearInRange = checkYearInRange(params)
        correctedParams.push(yearInRange)
    }
    if (params.month) {
        const monthInRange = checkMonthInRange(params)
        correctedParams.push(monthInRange)
    }
    if (params.day) {

    }

    const res = correctedParams.map(param => ('/' + param)).join('')
    return pathname === res ? false : res
}

function checkYearInRange(params) {
    const y = parseInt(params.year)
    const [from, to] = YearRange
    if (isNaN(y)) {
        return `/${new Date().getFullYear()}`
    } else if (y >= from && y <= to) {
        return (y)
    } else if (y < from) {
        return (from)
    } else if (y > to) {
        return (to)
    }
}

function checkMonthInRange(params) {
    const y = parseInt(params.year)
    const isCurrentYear = new Date().getFullYear() === y
    const m = parseInt(params.month)
    const [from, to] = MonthRange

    if (isNaN(m) || m < from || m > to) {
        if (isCurrentYear) {
            const currentMonth = new Date().getMonth() + 1
            return (currentMonth)
        } else {
            return (1)
        }
    } else {
        return (m)
    }
}