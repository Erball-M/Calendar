import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { checkDateInRange } from "../utils/dateUtils"

export const usePathnameEffect = () => {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const checkedUrl = checkDateInRange(params)
        if (checkedUrl) {
            navigate(checkedUrl)
        }
    }, [params])
}