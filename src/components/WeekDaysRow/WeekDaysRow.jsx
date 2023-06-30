import React from 'react'
import { WeekDayNames, WeekDayFullNames } from '../../constans/dateNames'
import cl from './WeekDaysRow.module.scss'

const WeekDaysRow = ({ short }) => {
    const neededNames = short ? WeekDayNames : WeekDayFullNames
    return (
        <div className={cl.grid}>
            {neededNames.map(weekDay => (
                <div
                    key={weekDay}
                    className={cl.day}
                >
                    {weekDay}
                </div>
            ))}
        </div>
    )
}

export { WeekDaysRow }