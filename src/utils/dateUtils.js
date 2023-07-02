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

    const caption = MonthNames[month]
    const daysCount = new Date(year, month + 1, 0).getDate()
    const weekDayStartNumber = new Date(year, month).getDay()
    const weekDayStart = weekDayStartNumber === 0 ? 6 : weekDayStartNumber - 1
    const days = []
    for (let i = 0; i < daysCount; i++) {
        const day = {
            id: i + 1,
            caption: i + 1,
            notices: [],
            isToday: checkIsToday({ ...params, day: i + 1 }),
            month: month + 1,
            weekDay: (weekDayStart + i) % 7,
            weekNumber: Math.ceil((i + 1 + weekDayStart) / 7),
        }
        days.push(day)
    }
    return ({
        id: month + 1,
        caption,
        days,
        daysCount,
        indent: weekDayStart,
        weeksCount: Math.ceil(daysCount / 7),
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
    const paramsClone = { ...params }

    if (paramsClone.year) {
        const yearInRange = checkYearInRange(paramsClone)
        paramsClone.year = yearInRange
    }
    if (paramsClone.month) {
        const monthInRange = checkMonthInRange(paramsClone)
        paramsClone.month = monthInRange
    }
    if (paramsClone.day) {
        const dayInRange = checkDayInRange(paramsClone)
        paramsClone.day = dayInRange
    }
    if (paramsClone.week) {
        const weekInRange = checkWeekInRange(paramsClone)
        paramsClone.week = weekInRange
    }

    const url = Object.values(paramsClone).map(param => `/${param}`).join('')
    return pathname === url ? false : url
}

function checkYearInRange(params) {
    const y = parseInt(params.year)

    if (isNaN(y)) {
        return (new Date().getFullYear())
    } else {
        return correctByRange(y, YearRange)
    }
}

function checkMonthInRange(params) {
    const y = parseInt(params.year)
    const isCurrentYear = (new Date().getFullYear()) === y
    const m = parseInt(params.month)

    if (isNaN(m)) {
        if (isCurrentYear) {
            return (new Date().getMonth() + 1)
        } else {
            return (1)
        }
    } else {
        return correctByRange(m, MonthRange)
    }
}
function checkDayInRange(params) {
    const y = parseInt(params.year)
    const isCurrentYear = (new Date().getFullYear()) === y
    const m = parseInt(params.month)
    const isCurrentMonth = (new Date().getMonth()) === m
    const d = parseInt(params.day)

    const dayRange = [1, (new Date(y, m, 0).getDate())]

    if (isNaN(d)) {
        if (isCurrentYear && isCurrentMonth) {
            return (new Date().getDate())
        } else {
            return (1)
        }
    } else {
        return correctByRange(d, dayRange)
    }
}

function checkWeekInRange(params) {
    const y = parseInt(params.year)
    const isCurrentYear = (new Date().getFullYear()) === y
    const m = parseInt(params.month)
    const isCurrentMonth = (new Date().getMonth()) === m
    const d = parseInt(params.day)
    const isCurrentDay = (new Date().getDate()) === d
    const w = parseInt(params.week)

    const weekDayStartNumber = new Date(y, m - 1).getDay() - 1
    const daysCount = new Date(y, m, 0).getDate()
    const weeksCount = Math.ceil((daysCount + weekDayStartNumber) / 7)
    const weekRange = [1, weeksCount]
    const currentWeek = Math.ceil((d + weekDayStartNumber) / 7)
    const handledWeek = correctByRange(currentWeek, weekRange)

    return (handledWeek)
}

function correctByRange(value, range) {
    const [from, to] = range

    if (value >= from && value <= to) {
        return (value)
    } else if (value < from) {
        return (from)
    } else if (value > to) {
        return (to)
    }
}

export function getDefaultPathname() {
    const date = new Date()
    return `/${date.getFullYear()}/${date.getMonth() + 1}`
}

export function getWeekNumber(params) {
    const { year, month = 1, day = 1 } = params

    const weekDayStartNumber = new Date(year, month).getDay()
    const weekDayStart = weekDayStartNumber === 0 ? 6 : weekDayStartNumber - 1
    const weekNumber = Math.ceil((day + weekDayStart) / 7)
    return weekNumber
}