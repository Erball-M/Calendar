import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { checkLocation } from "../utils/dateUtils"

export const usePathnameEffect = () => {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const checkedUrl = checkLocation(params)
        if (checkedUrl) {
            navigate(checkedUrl)
        }
    }, [params])
}