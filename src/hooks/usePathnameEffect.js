import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { checkLocation, getDefaultPathname } from "../utils/dateUtils"

export const usePathnameEffect = () => {
    const params = useParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        const checkedUrl = checkLocation(params)
        if (checkedUrl === pathname) {
            return
        } else if (!Object.keys(params).length) {
            navigate(getDefaultPathname())
            return
        }
        navigate(checkedUrl)
    }, [params])
}