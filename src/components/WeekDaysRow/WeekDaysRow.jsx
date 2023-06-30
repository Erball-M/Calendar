import React from 'react'
import classNames from 'classnames'
import { WeekDayNames, WeekDayFullNames } from '../../constans/dateNames'
import cl from './WeekDaysRow.module.scss'

const WeekDaysRow = ({ short, className }) => {
    const neededNames = short ? WeekDayNames : WeekDayFullNames
    return (
        <div className={classNames(cl.grid, !short && cl.fixedHeight, className)}>
            {neededNames.map(weekDay => (
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