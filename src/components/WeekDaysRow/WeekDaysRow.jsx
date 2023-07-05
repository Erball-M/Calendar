import React from 'react'
import classNames from 'classnames'
import { WeekDayNames, WeekDayFullNames } from '../../constans/dateNames'
import cl from './WeekDaysRow.module.scss'

const WeekDaysRow = ({ weekDay, short, className }) => {
    const neededNames = short ? WeekDayNames : WeekDayFullNames
    const handledWeekDays = isNaN(weekDay) ? neededNames : neededNames.filter((_, index) => index === (weekDay - 1))

    return (
        <div className={classNames(cl.grid, !short && cl.fixedHeight, className)}>
            {handledWeekDays.map(weekDay => (
                <div
                    key={weekDay}
                    className={classNames(cl.day, short && cl.center)}
                >
                    {weekDay}
                </div>
            ))}
        </div>
    )
}

export { WeekDaysRow }