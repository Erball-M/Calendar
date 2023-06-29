// import { MonthNames } from '../constans/dateNames'
// import { YearRange } from '../constans/availableRanges'

// export const getYearMonths = (year) => {
//     const y = parseInt(year)
//     const res = []
//     for (let i = 0; i < MonthNames.length; i++) {
//         const name = MonthNames[i]
//         const daysCount = new Date(y, i + 1, 0).getDate()
//         const weekDayStartNumber = new Date(y, i).getDay()
//         const weekDayStart = weekDayStartNumber === 0 ? 6 : weekDayStartNumber - 1
//         const days = []
//         for (let j = 0; j < daysCount; j++) {
//             const day = {
//                 date: j + 1,
//                 notices: [],
//             }
//             days.push(day)
//         }
//         res.push({
//             name,
//             days,
//             daysCount,
//             weekDayStart,
//         })
//     }
//     return res
// }

// export const getDaysWithIndent = (month) => {
//     const indentDays = []
//     for (let i = 0; i < month.weekDayStart; i++) {
//         indentDays.push(`indentDay${i}`)
//     }
//     return [...indentDays, ...month.days]
// }

// export const checkYearInRange = (year) => {
//     const y = parseInt(year)
//     const [from, to] = YearRange
//     if (isNaN(y)) {
//         return `/${new Date().getFullYear()}`
//     } else if (y >= from && y <= to) {
//         return false
//     } else if (y < from) {
//         return `/${from}`
//     } else if (y > to) {
//         return `/${to}`
//     }
// }