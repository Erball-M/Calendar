import { MonthNames } from '../constans/dateNames'
import { YearRange, MonthRange } from '../constans/availableRanges'


export function getYearMonths(prettyParams) { // PRETTY => PRETTY
    const res = []
    for (let i = 1; i <= MonthNames.length; i++) {
        res.push(getMonthDays({ ...prettyParams, month: i }))
    }
    return res
}

export function getMonthDays(prettyParams) { // PRETTY => UGLY | PRETTY
    const uglifiedParams = uglifyParams(prettyParams) // CLONED, CONVERTED AND UGLIFIED

    const caption = MonthNames[uglifiedParams.month]
    const daysCount = getDaysCount(uglifiedParams)
    const weekDayStart = getStartWeekDay(uglifiedParams)

    const days = []
    for (let i = 1; i <= daysCount; i++) {
        const day = {
            id: `/${prettyParams.year}/${prettyParams.month}/${i}`,
            caption: i,
            notices: [],
            isToday: checkCurrentDay({ ...uglifiedParams, day: i }),
            month: prettyParams.month,
            year: prettyParams.year,
            weekDay: (weekDayStart + i) % 7 || 7,
            weekNumber: getWeekNumber({ ...uglifiedParams, day: i }),
        }
        days.push(day)
    }

    return ({
        id: `${prettyParams.month}.${prettyParams.year}`,// uglifiedParams.month,
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

export function addIndentToYear(months) {
    const firstMonthWithIndent = getMonthDaysWithIndent(months[0])
    const res = [firstMonthWithIndent, ...months.slice(1)]
    return res
}

// RANGE CHECKERS

export function checkLocation(prettyParams) { // PRETTY => PRETTY
    const correctedParams = correctParams(prettyParams)
    return paramsURL(correctedParams)
}

export function getNeededRange(prettifyParams) { // PRETTY => ANY
    const uglifiedParams = uglifyParams(prettifyParams)
    const lastKey = Object.keys(prettifyParams).at(-1)
    let neededRange = null
    switch (lastKey) {
        case ('year'):
            neededRange = YearRange
            break;
        case ('month'):
            neededRange = MonthRange
            break;
        case ('day'):
            neededRange = getDaysRange(uglifiedParams)
            break;
        case ('week'):
            neededRange = getWeeksRange(uglifiedParams)
            break;
    }
    return neededRange
}

export function getNeighborParams(prettyParams, up = true) { // PRETTY => UGLY =>  PRETTY
    const uglifiedParams = uglifyParams(prettyParams) // UGLY

    const keys = Object.keys(uglifiedParams).reverse()
    const paramsArray = Object.entries(uglifiedParams).reverse()

    const prettyParamsArray = Object.entries(prettyParams).reverse()
    const ranges = keys.reduce((acc, key, index) => {
        const needParamsArray = prettyParamsArray.slice(index)
        const needParams = Object.fromEntries(needParamsArray.reverse())
        acc[key] = getNeededRange(needParams)
        return acc
    }, {})

    for (let i = 0; i < paramsArray.length; i++) {
        const newValue = paramsArray[i][1] + (up ? 1 : -1)

        const min = ranges[paramsArray[i][0]][0]
        const max = ranges[paramsArray[i][0]][1]

        if (newValue >= min && newValue <= max) {
            if (paramsArray[i][0] !== 'week') {
                paramsArray[i] = [paramsArray[i][0], newValue]
            } else {
                paramsArray[i + 1] = [paramsArray[i + 1][0], paramsArray[i + 1][1] + (up ? 7 : -7)]
            }
            break
        } else if (newValue > max) {
            paramsArray[i] = [paramsArray[i][0], 0]
        } else {
            const placeholder = up ? 0 : 1e6
            paramsArray[i] = [paramsArray[i][0], placeholder]
        }
    }

    const prettifiedParams = prettifyParams(Object.fromEntries(paramsArray.reverse())) // PRETTY
    const correctedByRanges = correctParams(prettifiedParams)
    return correctedByRanges
}

export function getLinks(prettyParams) { // PRETTY => PRETTY
    const { year, month, day, week } = correctParams(prettyParams, true)

    const next = getNeighborParams(prettyParams, true)
    const prev = getNeighborParams(prettyParams, false)

    const links = {
        year: paramsURL({ year }),
        month: paramsURL({ year, month }),
        day: paramsURL({ year, month, day }),
        week: paramsURL({ year, month, day, week }),
        today: paramsURL(getTodayParams()),
        next: paramsURL(next),
        prev: paramsURL(prev),
    }

    return links
}

export function correctParams(prettyParams, supplement = false) { // PRETTY => UGLY => PRETTY
    const uglifiedParams = uglifyParams(prettyParams) // CONVERTED, CLONED AND UGLIFIED

    if (supplement || 'year' in uglifiedParams) {
        const yearInRange = checkYearInRange(uglifiedParams)
        uglifiedParams.year = yearInRange
    }
    if (supplement || 'month' in uglifiedParams) {
        const monthInRange = checkMonthInRange(uglifiedParams)
        uglifiedParams.month = monthInRange
    }
    if (supplement || 'day' in uglifiedParams) {
        const dayInRange = checkDayInRange(uglifiedParams)
        uglifiedParams.day = dayInRange
    }
    if (supplement || 'week' in uglifiedParams) {
        const weekInRange = checkWeekInRange(uglifiedParams)
        uglifiedParams.week = weekInRange
    }

    const prettifiedParams = prettifyParams(uglifiedParams)
    return prettifiedParams
}

export function checkYearInRange(uglyParams) { // UGLY => UGLY
    const { year: y } = uglyParams // ALREADY CONVERTED

    if (isNaN(y)) {
        const currentYear = new Date().getFullYear()
        return currentYear
    } else {
        return correctByRange(y, YearRange)
    }
}

export function checkMonthInRange(uglyParams) { // UGLY => UGLY
    const { month: m } = uglyParams // ALREADY CONVERTED

    const isCurrentYear = checkCurrentYear(uglyParams)

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
export function checkDayInRange(uglyParams) { // UGLY => UGLY
    const { day: d } = uglyParams // ALREADY CONVERTED

    const isCurrentYear = checkCurrentYear(uglyParams)
    const isCurrentMonth = checkCurrentMonth(uglyParams)

    const dayRange = getDaysRange(uglyParams)

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

export function checkWeekInRange(uglyParams) { // UGLY => ANY
    const weekRange = getWeeksRange(uglyParams)
    const week = getWeekNumber(uglyParams)

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

export function checkCurrentYear(uglyParams) { // UGLY => ANY
    const { year } = convertParams(uglyParams)
    const current = new Date().getFullYear()

    const isCurrent = (current === year)
    return isCurrent
}

// MONTH

export function checkCurrentMonth(uglyParams) { // UGLY => ANY
    const { month } = convertParams(uglyParams)
    const current = new Date().getMonth()

    const isCurrent = ((current === month) && checkCurrentYear(uglyParams))
    return isCurrent
}

// DAY

export function getDaysCount(uglyParams) { // UGLY => ANY
    const { year: y, month: m } = convertParams(uglyParams)

    const count = new Date(y, m + 1, 0).getDate()
    return count
}

export function getDaysRange(uglyParams) { // UGLY => ANY
    const to = getDaysCount(uglyParams)
    const range = [1, to]
    return range
}

export function checkCurrentDay(uglyParams) { // UGLY => ANY
    const { day } = convertParams(uglyParams)
    const current = new Date().getDate()

    const isCurrent = ((current === day) && checkCurrentMonth(uglyParams))
    return isCurrent
}

export function getTodayParams() { // ANY => PRETTY
    const date = new Date()
    const params = prettifyParams({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
    })
    return params
}

// WEEK

export function getWeekNumber(uglyParams) { // UGLY => PRETTY
    const { day: d } = convertParams(uglyParams)

    const weekDayStartNumber = getStartWeekDay(uglyParams) - 1 //new Date(y, m - 1).getDay() - 1
    const weekNumber = Math.ceil((d + weekDayStartNumber) / 7)

    return weekNumber
}

export function getWeeksRange(uglyParams) { // UGLY => PRETTY
    const weeksCount = getWeeksCount(uglyParams)

    const weekRange = [1, weeksCount]
    return weekRange
}

export function getWeeksCount(uglyParams) { // UGLY => UGLY
    const weekDayStartNumber = getStartWeekDay(uglyParams)
    const daysCount = getDaysCount(uglyParams)

    const weeksCount = Math.ceil((daysCount + weekDayStartNumber) / 7)
    return weeksCount
}

export function getStartWeekDay(uglyParams) { // UGLY => UGLY
    const { year: y, month: m } = convertParams(uglyParams)

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

export function prettifyParams(uglyParams) {// UGLY => PRETTY
    const convertedParams = convertParams(uglyParams)
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
export function uglifyParams(prettyParams) { // PRETTY => UGLY
    const convertedParams = convertParams(prettyParams)
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

export function getDefaultPathname() { // ANY => PRETTY
    const date = new Date()
    return `/${date.getFullYear()}/${date.getMonth() + 1}`
}

export function paramsURL(prettyParams) { // PRETTY => PRETTY
    const keys = Object.keys(prettyParams)
    let url = ''
    keys.forEach(key => url += `/${prettyParams[key]}`)
    return url
}