import React from 'react'
import classNames from 'classnames'
import cl from './MonthDay.module.scss'

const MonthDay = ({ day }) => {
    const anchor = day.caption === 1 ? `${day.year}/${day.month}` : null
    const handledCaption = day.caption === 1 ? `${String(day.caption).padStart(2, '0')}.${String(day.month).padStart(2, '0')}` : day.caption

    return (
        <div
            key={day.id}
            data-anchor={anchor}
            className={classNames(
                cl.day,
                (day.month % 2) ? cl.odd : cl.even,
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
}

export { MonthDay }