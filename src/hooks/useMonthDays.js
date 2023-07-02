import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { getMonthDays, getMonthDaysWithIndent, getYearMonths } from "../utils/dateUtils"

export const useMonthDays = () => {
    const params = useParams()
    const handledParams = useMemo(() => ({ ...params, month: (parseInt(params.month) - 1) }), [params])

    // Need to add prev and next YearMonthsArray for dynamic rendering

    const res = useMemo(() => {
        if (handledParams.year && !isNaN(handledParams.month)) {
            // const month = getMonthDays(handledParams)
            // const monthWithIndents = getMonthDaysWithIndent(month)
            // return monthWithIndents

            const months = getYearMonths(handledParams)
            return months.map((el, i) => {
                el.days[0].caption = ('01.' + `0${el.id}`.slice(-2))
                return (i === 0 ? getMonthDaysWithIndent(el) : el)
            })
        }
        const yearMonths = getYearMonths(handledParams)
        const yearMonthsWithIndents = yearMonths.map(month => getMonthDaysWithIndent(month))
        return yearMonthsWithIndents
    }, [handledParams])
    return res
}