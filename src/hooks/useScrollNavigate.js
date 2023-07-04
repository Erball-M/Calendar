import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useScrollNavigate = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const lastParam = useMemo(() => pathname.split('/').filter(item => item !== '').at(-1), [])
    const [currentAnchor, setCurrentAnchor] = useState(lastParam)

    useEffect(() => {
        const lastParam = pathname.split('/').at(-1)
        const anchor = document.querySelector(`[data-anchor="${lastParam}"]`)
        if (!anchor) return
        anchor.scrollIntoView()
    }, [pathname])

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
    }, [])
    useEffect(() => {
        const params = pathname.split('/').filter(item => item !== '')
        params[params.length - 1] = currentAnchor
        const url = params.map(item => `/${item}`).join('')
        navigate(url)
    }, [currentAnchor])
}