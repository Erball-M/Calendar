// import { MonthNames } from '../constans/dateNames'
// import { MonthRange } from '../constans/availableRanges'

// export const checkMonthInRange = (year, month) => {
//     const y = parseInt(year)
//     const isCurrentYear = new Date().getFullYear() === y
//     const m = parseInt(month)
//     const [from, to] = MonthRange

//     if (isNaN(m) || m < from || m > to) {
//         if (isCurrentYear) {
//             const currentMonth = new Date().getMonth() + 1
//             return `/${y}/${currentMonth}`
//         } else {
//             return `/${y}/1`
//         }
//     } else {
//         return false
//     }
// }