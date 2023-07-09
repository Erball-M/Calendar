import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { getMonthDaysWithIndent } from '../../utils/dateUtils'
import { WeekDaysRow } from '../components'
import cl from './YearMonth.module.scss'

const YearMonth = ({ month }) => {
    const monthWithIndet = getMonthDaysWithIndent(month)

    return (
        <Link to={month.id} className={cl.month}>
            <h3 className={cl.name}>{month.caption}</h3>
            <WeekDaysRow short className={cl.week} />
            <div className={cl.grid}>
                {monthWithIndet.days.map(day => (
                    <div key={day.id} className={classNames(cl.day, day.isToday && cl.today)}>
                        {day.caption}
                    </div>
                ))}
            </div>
        </Link>
    )
}

export { YearMonth }