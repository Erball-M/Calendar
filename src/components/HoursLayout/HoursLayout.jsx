import React from 'react'
import classNames from 'classnames'
import { } from '../components'
import cl from './HoursLayout.module.scss'

const HoursLayout = ({ children }) => {
    const hours = Array.from({ length: 24 }, (_, index) => index)

    return (
        <div className='scrollContainer'>
            <div className={cl.wrapper}>
                <div className={cl.hours}>
                    {hours.map(hour => (
                        <div key={hour} className={classNames(cl.hour, 'scrollContainer_element')}>{hour}</div>
                    ))}
                </div>
                <div className={cl.day}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export { HoursLayout }