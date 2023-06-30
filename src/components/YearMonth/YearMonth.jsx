import React, { useMemo } from 'react'
import classNames from 'classnames'
import { getMonthDaysWithIndent } from '../../utils/dateUtils'
import { WeekDaysRow } from '../components'
import cl from './YearMonth.module.scss'

const YearMonth = ({ month }) => {
    console.log(month)
    return (
        <div className={cl.month}>
            <h3 className={cl.name}>{month.name}</h3>
            <WeekDaysRow short />
            <div className={cl.grid}>
                {month.days.map(day => (
                    <div key={day.id} className={classNames(cl.day, day.isToday && cl.today)}>
                        {day.date || ''}
                    </div>
                ))}
            </div>
        </div>
    )
}

export { YearMonth }