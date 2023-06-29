import React, { useMemo } from 'react'
import { getMonthDaysWithIndent } from '../../utils/dateUtils'
import { WeekDayNames } from '../../constans/dateNames'
import cl from './YearMonth.module.scss'

const WeekDaysRow = () => {
    return (
        <>
            {WeekDayNames.map(weekDay => (
                <div
                    key={weekDay}
                    className={cl.day}
                >
                    {weekDay}
                </div>
            ))}
        </>
    )
}

const YearMonth = ({ month }) => {
    const hadnledMonthDays = useMemo(() => {
        return (getMonthDaysWithIndent(month))
    }, [month])

    return (
        <div className={cl.month}>
            <h3 className={cl.name}>{month.name}</h3>
            <div className={cl.grid}>
                <WeekDaysRow />
                {hadnledMonthDays.map(day => (
                    <div key={day?.date || day} className={cl.day}>
                        {day?.date || ''}
                    </div>
                ))}
            </div>
        </div>
    )
}

export { YearMonth }