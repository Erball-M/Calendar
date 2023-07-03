import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { getMonthDaysWithIndent, getYearMonths } from "../utils/dateUtils"

export const useMonthDays = () => {
    const params = useParams()
    // const handledParams = useMemo(() => ({ ...params, month: (parseInt(params.month) - 1) }), [params])

    // Need to add prev and next YearMonthsArray for dynamic rendering

    const res = useMemo(() => {
        if (params.year && !isNaN(params.month)) {
            // const month = getMonthDays(handledParams)
            // const monthWithIndents = getMonthDaysWithIndent(month)
            // return monthWithIndents

            const months = getYearMonths(params)
            return months.map((el, i) => {
                el.days[0].caption = ('01.' + `0${el.id + 1}`.slice(-2))
                return (i === 0 ? getMonthDaysWithIndent(el) : el)
            })
        }
        const yearMonths = getYearMonths(params)
        const yearMonthsWithIndents = yearMonths.map(month => getMonthDaysWithIndent(month))
        return yearMonthsWithIndents
    }, [params])
    return res
}