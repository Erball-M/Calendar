import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { IcoWrapper } from '../IcoWrapper/IcoWrapper'
import { Arrow } from '../../../images/images'
import cl from './Select.module.scss'

const Select = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isListLong, setIsListLong] = useState(false)
    const [longestLabel, setLongestLabel] = useState(0)

    const selectedOption = value ? options.find(option => option.value === value) : options[0]

    const listRef = useRef()

    const toggler = () => setIsOpen(!isOpen)
    const handleChange = (e) => {
        onChange(e)
        setIsOpen(false)
    }

    useLayoutEffect(() => {
        const labels = options.map(option => option.label)
        let longest = ''
        for (let label of labels) {
            if (label.length > longest.length) {
                longest = label
            }
        }
        setLongestLabel(longest.length)
    }, [])

    useLayoutEffect(() => {
        if (!listRef.current) return

        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        const coords = listRef.current.getBoundingClientRect()
        if (coords.bottom > windowHeight) {
            setIsListLong(true)
        }
    }, [isOpen])

    return (
        <div className={cl.select}>
            <div className={classNames(cl.label, isOpen && cl.opened)} onClick={toggler}>
                <span className={cl.title} style={{ width: `calc(.75em * ${longestLabel})` }}>{selectedOption.label}</span>
                <IcoWrapper>
                    <Arrow className={cl.ico} />
                </IcoWrapper>
            </div>
            {
                isOpen
                && <>
                    <div className={cl.wrapper} onClick={toggler} />
                    <ul
                        className={cl.list}
                        ref={listRef}
                        style={isListLong ? { bottom: '100%' } : {}}
                    >
                        {options.map(option => (
                            <li
                                key={option.value}
                                className={classNames(
                                    cl.option,
                                    selectedOption.value === option.value && cl.selected
                                )}
                                data-value={option.value}
                                onClick={handleChange}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </>
            }
        </div>
    )
}

export { Select }