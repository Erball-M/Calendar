import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { getMonthDays, getMonthDaysWithIndent, getYearMonths } from "../utils/dateUtils"

export const useMonthDays = () => {
    const params = useParams()
    const handledParams = useMemo(() => ({ ...params, month: (parseInt(params.month) - 1) }), [params])
    console.log(handledParams)

    const res = useMemo(() => {
        if (handledParams.year && !isNaN(handledParams.month)) {
            return getMonthDays(handledParams)
        }
        const yearMonths = getYearMonths(handledParams)
        const yearMonthsWithIndents = yearMonths.map(month => getMonthDaysWithIndent(month))
        return yearMonthsWithIndents
    }, [handledParams])
    return res
}