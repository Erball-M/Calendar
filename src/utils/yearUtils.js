import { MonthNames } from '../constans/dateNames'

export const getYearMonths = (year) => {
    const res = []
    for (let i = 0; i < MonthNames.length; i++) {
        const monthName = MonthNames[i]
        const daysCount = new Date(year, i + 1, 0).getDate()
        const days = []
        for (let j = 0; j < daysCount; j++) {
            const day = {
                date: j + 1,
                notices: [],
            }
            days.push(day)
        }
        res.push({
            monthName,
            days,
            daysCount,
        })
    }
    return res
}