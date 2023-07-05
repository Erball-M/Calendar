import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { getNeighborParams, getYearMonths } from "../utils/dateUtils"

export const useMonthDays = () => {
    const { year } = useParams()
    // Need to add prev and next YearMonthsArray for dynamic rendering

    const res = useMemo(() => {
        const currentYearMonths = getYearMonths({ year })
        return currentYearMonths
        //const months = [...prevYearMonths, ...currentYearMonths, ...nextYearMonths]
    }, [year])
    return res
}