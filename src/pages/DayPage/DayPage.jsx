import React from 'react'
import classNames from 'classnames'
import { usePathnameEffect } from '../../hooks/usePathnameEffect'
import { HoursLayout, Day, WeekDaysRow } from '../../components/components'
import cl from './DayPage.module.scss'

const DayPage = () => {
    usePathnameEffect()
    return (
        <>
            <WeekDaysRow weekDay={1} />
            <div className={classNames('scrollContainer')}>
                <HoursLayout>
                    <Day />
                </HoursLayout>
            </div>
        </>
    )
}

export { DayPage }