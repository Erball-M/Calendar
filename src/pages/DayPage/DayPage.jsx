import React, { useMemo } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { getMonthDays } from '../../utils/dateUtils'
import { HoursLayout, Day, WeekDaysRow } from '../../components/components'
import cl from './DayPage.module.scss'

const DayPage = () => {
    const params = useParams()
    const months = useOutletContext()

    const month = useMemo(() => {
        const needMonth = months.find(month => month.id.includes(`/${params.year}/${params.month}`))
        return needMonth
    }, [params.year, params.month])
    const day = useMemo(() => {
        const needDay = month.days.find(day => day.caption == params.day)
        return needDay
    }, [month, params.day])

    return (
        <>
            <WeekDaysRow weekDay={day?.weekDay} />
            <div className={classNames('scrollContainer')}>
                <HoursLayout>
                    <Day day={day} />
                </HoursLayout>
            </div>
        </>
    )
}

export { DayPage }