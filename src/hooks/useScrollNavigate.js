import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export const useScrollNavigate = () => {
    const params = useParams()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [currentAnchor, setCurrentAnchor] = useState(null)
    const [autoScrollPermission, setAutoScrollPermission] = useState(true)

    useEffect(() => {
        if (autoScrollPermission) {
            const link = pathname.split('/').slice(-2).join('/')
            const anchor = document.querySelector(`[data-anchor="${link}"]`)
            if (!anchor) return
            anchor.scrollIntoView()
        }
    }, [pathname, autoScrollPermission])

    useEffect(() => {
        setAutoScrollPermission(true)
        const scrollContainer = document.querySelector('.scrollContainer')
        const anchors = document.querySelectorAll('[data-anchor]')

        const scrollHandler = () => {
            for (let i = 0; i < anchors.length; i++) {
                const anchor = anchors[i]
                const coords = anchor.getBoundingClientRect()
                const anchorTop = coords.top - coords.height

                if (anchorTop <= 0) {
                    setCurrentAnchor(anchor.dataset.anchor)
                }
            }
        }

        scrollContainer.addEventListener('scroll', scrollHandler)
        return () => scrollContainer.removeEventListener('scroll', scrollHandler)
    }, [params])

    useEffect(() => {
        if (!currentAnchor) return

        const params = pathname.split('/').filter(item => item !== '')
        const prevLastParam = parseInt(params.slice(-2))
        const nextLastParam = parseInt(currentAnchor)

        if (prevLastParam >= nextLastParam) {
            setAutoScrollPermission(false)
        } else {
            setAutoScrollPermission(true)
        }

        navigate(currentAnchor)
    }, [currentAnchor])

    return () => setAutoScrollPermission(true)
}