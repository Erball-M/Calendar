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
    const handledMonth = month - 1
    const name = MonthNames[handledMonth]
    const daysCount = new Date(year, handledMonth + 1, 0).getDate()
    const weekDayStartNumber = new Date(year, handledMonth).getDay()
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
    for (let i = 0; i < month.weekDayStart; i++) {
        indentDays.push(`indentDay${i}`)
    }
    return [...indentDays, ...month.days]
}

export function checkDateInRange(params) {
    const year = parseInt(params.year)
    const month = parseInt(params.month)
    const day = parseInt(params.day)

    let res = ''
    if (year ?? false) {
        const yearInRange = checkYearInRange(year)
        res += yearInRange
    }
    if (month ?? false) {
        const monthInRange = checkMonthInRange(month)
        res += monthInRange
    }
    if (day ?? false) {

    }
    return res
}

function checkYearInRange(year) {
    const y = parseInt(year)
    const [from, to] = YearRange
    if (isNaN(y)) {
        return `/${new Date().getFullYear()}`
    } else if (y >= from && y <= to) {
        return `${year}`
    } else if (y < from) {
        return `/${from}`
    } else if (y > to) {
        return `/${to}`
    }
}

function checkMonthInRange(year, month) {
    const y = parseInt(year)
    const isCurrentYear = new Date().getFullYear() === y
    const m = parseInt(month)
    const [from, to] = MonthRange

    if (isNaN(m) || m < from || m > to) {
        if (isCurrentYear) {
            const currentMonth = new Date().getMonth() + 1
            return `/${currentMonth}`
        } else {
            return `/1`
        }
    } else {
        return `/${month}`
    }
}