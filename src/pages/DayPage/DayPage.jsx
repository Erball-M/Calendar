import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import { getMonthDays } from '../../utils/dateUtils'
import { usePathnameEffect } from '../../hooks/usePathnameEffect'
import { HoursLayout, Day, WeekDaysRow } from '../../components/components'
import cl from './DayPage.module.scss'

const DayPage = () => {
    const params = useParams()
    const month = useMemo(() => getMonthDays(params), [params.month])
    usePathnameEffect()

    const day = month.days.find(day => day.caption == params.day)

    return (
        <>
            <WeekDaysRow weekDay={day.weekDay} />
            <div className={classNames('scrollContainer')}>
                <HoursLayout>
                    <Day day={day} />
                </HoursLayout>
            </div>
        </>
    )
}

export { DayPage }