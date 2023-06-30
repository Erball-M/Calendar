import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkDateInRange } from "../utils/dateUtils"

export const usePathnameEffect = (params) => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkedUrl = checkDateInRange(params)
        if (checkedUrl) {
            navigate(checkedUrl)
        }
    }, [params])
}