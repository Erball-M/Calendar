import { MonthNames } from '../constans/dateNames'
import { YearRange, MonthRange } from '../constans/availableRanges'


export function getYearMonths(params) { //arguments: params
    const res = []
    for (let i = 0; i < MonthNames.length; i++) {
        res.push(getMonthDays({ ...params, month: i }))
    }
    return res
}

function checkIsToday(params) {
    const now = new Date()
    const { day, month, year } = params
    const res = (day == now.getDate())
        && (month == now.getMonth())
        && (year == now.getFullYear())
    return res
}
export function getMonthDays(params) {
    const { year, month } = params

    const name = MonthNames[month]
    const daysCount = new Date(year, month + 1, 0).getDate()
    const weekDayStartNumber = new Date(year, month).getDay()
    const weekDayStart = weekDayStartNumber === 0 ? 6 : weekDayStartNumber - 1
    const days = []
    for (let i = 0; i < daysCount; i++) {
        const day = {
            id: i + 1,
            date: !i ? ('01.' + `0${month + 1}`.slice(-2)) : i + 1,
            notices: [],
            isToday: checkIsToday({ ...params, day: i + 1 }),
            oddMonth: !!((month + 1) % 2),
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
        indentDays.push({ id: `indentDay${i}`, date: '' })
    }
    return { ...month, days: [...indentDays, ...month.days] }
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
        return (new Date().getFullYear())
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
    const isCurrentYear = (new Date().getFullYear()) === y
    const m = parseInt(params.month)
    const [from, to] = MonthRange
    if (isNaN(m)) {
        return ''
    } else if (m < from || m > to) {
        if (isCurrentYear) {
            const currentMonth = (new Date().getMonth() + 1)
            return (currentMonth)
        } else {
            return (1)
        }
    } else {
        return (m)
    }
}

export function getDefaultPathname() {
    const date = new Date()
    return `/${date.getFullYear()}/${date.getMonth() + 1}`
}