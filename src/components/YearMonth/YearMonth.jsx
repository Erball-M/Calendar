import React, { useMemo } from 'react'
import classNames from 'classnames'
import { WeekDaysRow } from '../components'
import cl from './YearMonth.module.scss'

const YearMonth = ({ month }) => {
    return (
        <div className={cl.month}>
            <h3 className={cl.name}>{month.caption}</h3>
            <WeekDaysRow short className={cl.week} />
            <div className={cl.grid}>
                {month.days.map(day => (
                    <div key={day.id} className={classNames(cl.day, day.isToday && cl.today)}>
                        {day.caption}
                    </div>
                ))}
            </div>
        </div>
    )
}

export { YearMonth }