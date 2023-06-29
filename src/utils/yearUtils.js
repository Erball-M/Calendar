import { MonthNames } from '../constans/dateNames'

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