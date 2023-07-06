import React, { forwardRef } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import cl from './MonthDay.module.scss'

const MonthDay = forwardRef(({ day }, anchorRef) => {
    const { pathname } = useLocation()

    const anchor = day.caption === 1 ? `/${day.year}/${day.month}` : null
    const handledRef = day.caption === 1 ? anchorRef : null
    const handledCaption = day.caption === 1 ? `${String(day.caption).padStart(2, '0')}.${String(day.month).padStart(2, '0')}` : day.caption

    return (
        <div
            key={day.id}
            data-anchor={anchor}
            ref={handledRef}
            className={classNames(
                cl.day,
                (day.month % 2) ? cl.odd : cl.even,
                (day.id.startsWith(pathname) || day.id.includes('indent')) && cl.forPrint,
                'scrollContainer_element',
            )}
        >
            <div
                className={classNames(
                    cl.day__header,
                    day.isToday && cl.day__header_today,
                )}
            >
                {handledCaption}
            </div>
            <div className={cl.day__body}>
                <ul className={cl.list}>
                    {day.notices && day.notices.map(notice => (
                        <li key={notice.id} className={cl.list__item}>
                            {notice.caption}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
})

export { MonthDay }