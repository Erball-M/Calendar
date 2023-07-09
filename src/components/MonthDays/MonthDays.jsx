import React, { forwardRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { getDateString } from '../../utils/dateUtils'
import cl from './MonthDays.module.scss'

const MonthDays = forwardRef(({ month }, ref) => {
    const { pathname } = useLocation()

    // const anchor = day.caption === 1 ? `/${day.year}/${day.month}` : null
    // const handledRef = day.caption === 1 ? anchorRef : null
    // const handledCaption = day.caption === 1 ? `${String(day.caption).padStart(2, '0')}.${String(day.month).padStart(2, '0')}` : day.caption

    return (
        <>
            {month.days.map(day => (
                <div
                    key={day.id}
                    data-anchor={day.caption === 1 ? `/${day.year}/${day.month}` : null}
                    data-date={day.notices ? getDateString(day.id) : null}
                    ref={day.caption === 1 ? ref : null}
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
                        {day.caption === 1 ? `${String(day.caption).padStart(2, '0')}.${String(day.month).padStart(2, '0')}` : day.caption}
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
            ))}
        </>
    )
})

export { MonthDays }