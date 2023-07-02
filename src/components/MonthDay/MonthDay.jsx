import React from 'react'
import classNames from 'classnames'
import cl from './MonthDay.module.scss'

const MonthDay = ({ day }) => {
    // day.notices = [
    //     { id: 1, caption: 'заметка 1' },
    //     { id: 2, caption: 'заметка 2' },
    //     { id: 3, caption: 'заметка 3' },
    //     { id: 4, caption: 'заметка 4' },
    //     { id: 5, caption: 'заметка 5' },
    //     { id: 6, caption: 'заметка 6' },
    //     { id: 7, caption: 'заметка 7' },
    //     { id: 8, caption: 'заметка 8' },
    //     { id: 9, caption: 'заметка 9' },
    // ]
    return (
        <div key={day.id} className={classNames(cl.day, 'scrollContainer_element', (day.month % 2) ? cl.odd : cl.even)}>
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