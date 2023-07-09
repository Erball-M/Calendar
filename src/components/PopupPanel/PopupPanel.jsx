import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { addNotice } from '../../store/slices/dataSlice'
import { AddNoticeForm, Button, IcoWrapper } from '../components'
import { TriangleArrow, XIco } from '../../images/images'
import cl from './PopupPanel.module.scss'

const PopupPanel = ({ isOpen = false, toggler, triggeredNode, cursor = { x: 0, y: 0 } }) => {
    const dispatch = useDispatch()

    const [rect, setRect] = useState({})
    const [arrow, setArrow] = useState({})
    const [eventData, setEventData] = useState({
        eventName: '',
        placeName: '',
        start: '',
        end: '',
        allDay: false,
        alarm: null,
    })

    const submitHandler = (e) => {
        dispatch(addNotice(eventData))
        toggler()
        e.preventDefault()
    }

    useEffect(() => {
        if (!isOpen) {
            setEventData({
                eventName: '',
                placeName: '',
                start: '',
                end: '',
                allDay: false,
                alarm: null,
            })
        }
    }, [isOpen])

    const ref = useRef()
    useLayoutEffect(() => {
        if (!ref.current || !triggeredNode) return

        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        const coordsFrom = triggeredNode.getBoundingClientRect()
        const coords = ref.current.getBoundingClientRect()

        const dateString = triggeredNode.dataset.date
        const triggeredType = dateString.includes('T') ? 'hour' : 'day'

        if (triggeredType === 'day') {
            setEventData({ ...eventData, allDay: true })
        }
        const startTime = dateString.slice(dateString.indexOf('T') + 1)
        // const [h, m] = startTime.split(':')
        // const endM = (+m + 30) === 60 ? '00' : '30'
        // const endH = (+m + 30) === 60 ? (+h + 1) : h
        // const end = `${(endH == 24) ? '00' : endH}:${endM}`
        setEventData({
            ...eventData,
            start: startTime,
            // end: end,
        })

        let arrowPos = 'left'
        let arrowTop = 0
        let x = 0
        let y = 0

        if (triggeredType === 'day') {
            x = coordsFrom.x + coordsFrom.width + 15
            arrowPos = (x + coords.width > windowWidth) ? 'right' : 'left'
            x = (arrowPos === 'right') ? coordsFrom.x - coords.width - 15 : x
            y = Math.min(coordsFrom.y + (coordsFrom.height / 2) - (coords.height / 2), windowHeight - coords.height - 10)
            arrowTop = coordsFrom.y + (coordsFrom.height / 2) - y
        } else if (triggeredType === 'hour') {
            x = cursor.x + 15
            arrowPos = (x + coords.width > windowWidth) ? 'right' : 'left'
            x = (arrowPos === 'right') ? cursor.x - coords.width - 15 : x
            y = Math.min(coordsFrom.y + (coordsFrom.height / 2) - (coords.height / 2), windowHeight - coords.height)
            arrowTop = coordsFrom.y + (coordsFrom.height / 2) - y - 10
        }

        setArrow({
            rotate: arrowPos === 'right' ? '90deg' : '-90deg',
            translate: arrowPos === 'right' ? '80%' : '-80%',
            [arrowPos]: `0px`,
            top: `${arrowTop}px`,
        })

        setRect({ x, y })
    }, [isOpen])

    if (!isOpen) return null
    return (
        <div className={cl.wrapper} onClick={toggler}>
            <div
                className={cl.container}
                onClick={e => e.stopPropagation()}
                ref={ref}
                style={{ left: `${rect.x}px`, top: `${rect.y}px` }}
            >
                <div className={cl.header}>
                    <div className={cl.btns}>
                        <Button variant='transparent' onClick={toggler}>
                            <XIco />
                        </Button>
                    </div>
                </div>
                <div className={cl.body}>
                    <AddNoticeForm eventData={eventData} setEventData={setEventData} submitHandler={submitHandler} />
                </div>
                <IcoWrapper className={cl.triangle} style={{ ...arrow }}>
                    <TriangleArrow className={cl.ico} />
                </IcoWrapper>
            </div>
        </div>
    )
}

export { PopupPanel }