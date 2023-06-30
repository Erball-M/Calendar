import { useParams, useNavigate, useLocation } from "react-router-dom"

export const usePageNavigate = (to) => {
    const params = useParams()
    const navigate = useNavigate()


}