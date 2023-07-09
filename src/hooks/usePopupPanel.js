import { useState } from "react"

export const usePopupPanel = (selector) => {
    const [isOpen, setIsOpen] = useState(false)
    const [triggeredNode, setTriggeredNode] = useState(null)
    const [cursor, setCursor] = useState({})

    const toggler = () => setIsOpen(!isOpen)

    const handler = (e) => {
        const target = e.target.closest(selector)
        if (!target) return
        setTriggeredNode(target)
        setCursor({ x: e.clientX, y: e.clientY })
        toggler()
    }

    return { isOpen, triggeredNode, cursor, toggler, handler }
}