import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useScrollNavigate = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const lastParam = useMemo(() => pathname.split('/').filter(item => item !== '').at(-1), [])
    const [currentAnchor, setCurrentAnchor] = useState(lastParam)
    const [autoScrollPermission, setAutoScrollPermission] = useState(true)
    const paramsLength = pathname.split('/').filter(item => item !== '').length

    useEffect(() => {
        if (autoScrollPermission) {
            const lastParam = pathname.split('/').at(-1)
            const anchor = document.querySelector(`[data-anchor="${lastParam}"]`)
            if (!anchor) return
            // AUTOSCROLL WORKS CUZ NEW PATHNAME
            anchor.scrollIntoView()
        }
    }, [pathname, autoScrollPermission])

    useEffect(() => {
        setAutoScrollPermission(true)
    }, [paramsLength])

    useEffect(() => {
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
    }, [paramsLength])

    useEffect(() => {
        const params = pathname.split('/').filter(item => item !== '')
        const prevLastParam = +params.at(-1)
        const nextLastParam = +currentAnchor

        if (prevLastParam >= nextLastParam) {
            setAutoScrollPermission(false)
        } else {
            setAutoScrollPermission(true)
        }

        params[params.length - 1] = currentAnchor
        const url = params.map(item => `/${item}`).join('')
        navigate(url)
    }, [currentAnchor])

    return setAutoScrollPermission
}