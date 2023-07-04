import React from 'react'
import classNames from 'classnames'
import cl from './MonthDay.module.scss'

const MonthDay = ({ day }) => {
    const anchor = day.id === 1 ? day.month : null

    return (
        <div key={day.id} data-anchor={anchor} className={classNames(cl.day, 'scrollContainer_element', (day.month % 2) ? cl.odd : cl.even)}>
            <div
                className={classNames(cl.day__header, day.isToday && cl.day__header_today,)}
            >
                {day.caption}
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