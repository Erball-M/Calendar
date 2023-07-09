import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const useScrollNavigate = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [currentAnchor, setCurrentAnchor] = useState(null)
    const [autoScrollPermission, setAutoScrollPermission] = useState(true)

    const containerRef = useRef()
    const anchorRefs = useRef([])
    anchorRefs.current = []

    const addAnchor = (el) => {
        if (el && !anchorRefs.current.includes(el)) {
            anchorRefs.current.push(el)
        }
    }

    useEffect(() => {
        // console.log('event added')
        const scrollContainer = containerRef.current
        const anchors = anchorRefs.current

        const scrollHandler = () => {
            for (let i = 0; i < anchors.length; i++) {
                const anchor = anchors[i]
                const coords = anchor.getBoundingClientRect()
                const anchorTop = coords.top - coords.height

                if (anchorTop <= 0) {
                    setCurrentAnchor(anchor)
                    setAutoScrollPermission(true)
                }
            }
        }

        scrollContainer.addEventListener('scroll', scrollHandler)
        return () => scrollContainer.removeEventListener('scroll', scrollHandler)
    }, [containerRef.current, anchorRefs.current[0]?.dataset.anchor])

    useEffect(() => {
        // console.log('auto scroll is ' + autoScrollPermission)
        if (autoScrollPermission) {
            const anchor = anchorRefs.current.find(
                (anchor) => anchor.dataset?.anchor === pathname
            )
            if (anchor) {
                anchor.scrollIntoView()
            }
            setAutoScrollPermission(false)
        }
    }, [pathname])

    useEffect(() => {
        if (!currentAnchor) {
            // console.log('navigatiion is cancled')
            return
        }
        // console.log('navigatiion')

        const prevLastParam = parseInt(pathname.split('/').at(-1))
        const nextLastParam = parseInt(
            currentAnchor.dataset.anchor.split('/').at(-1)
        )

        if (prevLastParam >= nextLastParam) {
            setAutoScrollPermission(false)
        } else {
            setAutoScrollPermission(true)
        }

        const newUrl = currentAnchor.dataset.anchor
        navigate(newUrl)
    }, [currentAnchor])

    return [containerRef, addAnchor]
}


// export const useScrollNavigate = () => {
//     const params = useParams()
//     const { pathname } = useLocation()
//     const navigate = useNavigate()

//     const [currentAnchor, setCurrentAnchor] = useState(null)
//     const [autoScrollPermission, setAutoScrollPermission] = useState(true)

//     const paramsLength = Object.keys(params).length

//     useLayoutEffect(() => {
//         if (autoScrollPermission) {
//             const link = pathname.split('/').slice(-2).join('/')
//             const anchor = document.querySelector(`[data-anchor='${link}']`)
//             if (!anchor) return
//             anchor.scrollIntoView()
//         }
//     }, [pathname, autoScrollPermission])

//     useEffect(() => setAutoScrollPermission(true), [paramsLength])

//     useEffect(() => {
//         const scrollContainer = document.querySelector('.scrollContainer')
//         const anchors = document.querySelectorAll('[data-anchor]')

//         const scrollHandler = () => {
//             for (let i = 0; i < anchors.length; i++) {
//                 const anchor = anchors[i]
//                 const coords = anchor.getBoundingClientRect()
//                 const anchorTop = coords.top - coords.height

//                 if (anchorTop <= 0) {
//                     setCurrentAnchor(anchor.dataset.anchor)
//                 }
//             }
//         }

//         scrollContainer.addEventListener('scroll', scrollHandler)
//         return () => scrollContainer.removeEventListener('scroll', scrollHandler)
//     }, [params])

//     useEffect(() => {
//         if (!currentAnchor) return

//         const params = pathname.split('/').filter(item => item !== '')
//         const prevLastParam = parseInt(params.slice(-2))
//         const nextLastParam = parseInt(currentAnchor)

//         if (prevLastParam >= nextLastParam) {
//             setAutoScrollPermission(false)
//         } else {
//             setAutoScrollPermission(true)
//         }

//         navigate(currentAnchor)
//     }, [currentAnchor])

//     return () => setAutoScrollPermission(true)
// }