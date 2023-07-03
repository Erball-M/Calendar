import { MonthNames } from '../constans/dateNames'
import { YearRange, MonthRange } from '../constans/availableRanges'


export function getYearMonths(params) { // PRETTY => PRETTY
    const res = []
    for (let i = 1; i <= MonthNames.length; i++) {
        res.push(getMonthDays({ ...params, month: i }))
    }
    return res
}

export function getMonthDays(params) { // PRETTY => UGLY | PRETTY
    const uglifiedParams = uglifyParams(params) // CLONED, CONVERTED AND UGLIFIED

    const caption = MonthNames[uglifiedParams.month]
    const daysCount = getDaysCount(uglifiedParams)
    const weekDayStart = getStartWeekDay(uglifiedParams)

    const days = []
    for (let i = 1; i <= daysCount; i++) {
        const day = {
            id: i,
            caption: i,
            notices: [],
            isToday: checkCurrentDay({ ...uglifiedParams, day: i }),
            month: uglifiedParams.month + 1,
            weekDay: (weekDayStart + i) % 7,
            weekNumber: getWeekNumber(uglifiedParams),
        }
        days.push(day)
    }

    return ({
        id: uglifiedParams.month,
        caption,
        days,
        daysCount,
        indent: weekDayStart,
        weeksCount: getWeeksCount(uglifiedParams),
    })
}

export function getMonthDaysWithIndent(month) {
    const indentDays = []
    for (let i = 0; i < month.indent; i++) {
        indentDays.push({ id: `indentDay${i}`, date: '' })
    }
    return { ...month, days: [...indentDays, ...month.days] }
}

// RANGE CHECKERS

export function checkLocation(params) { // PRETTY => PRETTY
    const pathname = window.location.pathname
    const correctedParams = correctParams(params)

    const url = paramsURL(correctedParams)
    return pathname === url ? false : url
}

export function getLinks(params) { // PRETTY => PRETTY
    const { year, month, day, week } = correctParams(params, true)

    const links = {
        year: paramsURL({ year }),
        month: paramsURL({ year, month }),
        day: paramsURL({ year, month, day }),
        week: paramsURL({ year, month, day, week }),
        today: paramsURL(getTodayParams()),
    }

    return links
}

export function correctParams(params, supplemented = false) { // PRETTY => UGLY => PRETTY
    const uglifiedParams = uglifyParams(params) // CONVERTED, CLONED AND UGLIFIED

    if (supplemented || 'year' in uglifiedParams) {
        const yearInRange = checkYearInRange(uglifiedParams)
        uglifiedParams.year = yearInRange
    }
    if (supplemented || 'month' in uglifiedParams) {
        const monthInRange = checkMonthInRange(uglifiedParams)
        uglifiedParams.month = monthInRange
    }
    if (supplemented || 'day' in uglifiedParams) {
        const dayInRange = checkDayInRange(uglifiedParams)
        uglifiedParams.day = dayInRange
    }
    if (supplemented || 'week' in uglifiedParams) {
        const weekInRange = checkWeekInRange(uglifiedParams)
        uglifiedParams.week = weekInRange
    }

    const prettifiedParams = prettifyParams(uglifiedParams)
    return prettifiedParams
}

export function checkYearInRange(params) { // UGLY => UGLY
    const { year: y } = params // ALREADY CONVERTED

    if (isNaN(y)) {
        const currentYear = new Date().getFullYear()
        return currentYear
    } else {
        return correctByRange(y, YearRange)
    }
}

export function checkMonthInRange(params) { // UGLY => UGLY
    const { month: m } = params // ALREADY CONVERTED

    const isCurrentYear = checkCurrentYear(params)

    if (isNaN(m)) {
        if (isCurrentYear) {
            const currentMonth = new Date().getMonth()
            return currentMonth
        } else {
            return (0)
        }
    } else {
        return correctByRange(m, MonthRange)
    }
}
export function checkDayInRange(params) { // UGLY => UGLY
    const { day: d } = params // ALREADY CONVERTED

    const isCurrentYear = checkCurrentYear(params)
    const isCurrentMonth = checkCurrentMonth(params)

    const dayRange = getDaysRange(params)

    if (isNaN(d)) {
        if (isCurrentYear && isCurrentMonth) {
            const currentDay = new Date().getDate()
            return currentDay
        } else {
            return (1)
        }
    } else {
        return correctByRange(d, dayRange)
    }
}

export function checkWeekInRange(params) { // UGLY => ANY
    const weekRange = getWeeksRange(params)
    const week = getWeekNumber(params)

    const handledWeek = correctByRange(week, weekRange)
    return handledWeek
}

function correctByRange(value, range) { // UGLY => UGLY
    const [from, to] = range

    if (value >= from && value <= to) {
        return (value)
    } else if (value < from) {
        return (from)
    } else if (value > to) {
        return (to)
    }
}

// YEAR

export function checkCurrentYear(params) { // UGLY => ANY
    const { year } = convertParams(params)
    const current = new Date().getFullYear()

    const isCurrent = (current === year)
    return isCurrent
}

// MONTH

export function checkCurrentMonth(params) { // UGLY => ANY
    const { month } = convertParams(params)
    const current = new Date().getMonth()

    const isCurrent = ((current === month) && checkCurrentYear(params))
    return isCurrent
}

// DAY

export function getDaysCount(params) { // UGLY => ANY
    const { year: y, month: m } = convertParams(params)

    const count = new Date(y, m + 1, 0).getDate()
    return count
}

export function getDaysRange(params) { // UGLY => ANY
    const to = getDaysCount(params)
    const range = [1, to]
    return range
}

export function checkCurrentDay(params) { // UGLY => ANY
    const { day } = convertParams(params)
    const current = new Date().getDate()

    const isCurrent = ((current === day) && checkCurrentMonth(params))
    return isCurrent
}

export function getTodayParams() { // ANY => PRETTY
    const date = new Date()
    const params = prettifyParams({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
    })
    return params
}

// WEEK

export function getWeekNumber(params) { // UGLY => PRETTY
    const { day: d } = convertParams(params)

    const weekDayStartNumber = getStartWeekDay(params) - 1 //new Date(y, m - 1).getDay() - 1
    const weekNumber = Math.ceil((d + weekDayStartNumber) / 7)

    return weekNumber
}

export function getWeeksRange(params) { // UGLY => PRETTY
    const weeksCount = getWeeksCount(params)

    const weekRange = [1, weeksCount]
    return weekRange
}

export function getWeeksCount(params) { // UGLY => UGLY
    const weekDayStartNumber = getStartWeekDay(params)
    const daysCount = getDaysCount(params)

    const weeksCount = Math.ceil((daysCount + weekDayStartNumber) / 7)
    return weeksCount
}

export function getStartWeekDay(params) { // UGLY => UGLY
    const { year: y, month: m } = convertParams(params)

    const weekDay = new Date(y, m, 0).getDay()
    //const res = weekDay === 0 ? 6 : (weekDay - 1)
    return weekDay
}

// GLOBAL

export function convertParams(params) { // ANY => ANY
    const convertedParams = {}
    Object.keys(params).forEach(key => convertedParams[key] = parseInt(params[key]))
    return convertedParams
}

export function prettifyParams(params) {// UGLY => PRETTY
    const convertedParams = convertParams(params)
    const keys = Object.keys(convertedParams)

    const res = {}
    keys.forEach(key => {
        switch (key) {
            case 'year':
            case 'day':
                res[key] = convertedParams[key]
                break;
            case 'month':
                res[key] = convertedParams[key] + 1
                break;
            case 'week':
                res[key] = convertedParams[key] === 0 ? 7 : convertedParams[key]
                break;
        }
    })
    return res
}
export function uglifyParams(params) { // PRETTY => UGLY
    const convertedParams = convertParams(params)
    const keys = Object.keys(convertedParams)

    const res = {}
    keys.forEach(key => {
        switch (key) {
            case 'year':
            case 'day':
                res[key] = convertedParams[key]
                break;
            case 'month':
                res[key] = convertedParams[key] - 1
                break;
            case 'week':
                res[key] = convertedParams[key] === 7 ? 0 : convertedParams[key]
                break;
        }
    })
    return res
}

// URL

export function getDefaultPathname() { // ANY => ANY
    const date = new Date()
    return `/${date.getFullYear()}/${date.getMonth() + 1}`
}

export function paramsURL(params) {
    const keys = Object.keys(params)
    let url = ''
    keys.forEach(key => url += `/${params[key]}`)
    return url
}