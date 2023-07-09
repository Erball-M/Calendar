import React, { useMemo } from 'react'
import classNames from 'classnames'
import { Day, HoursLayout, WeekDaysRow } from '../../components/components'
import cl from './WeekPage.module.scss'
import { useOutletContext, useParams } from 'react-router-dom'

const WeekPage = () => {
    const params = useParams()
    const months = useOutletContext()

    console.log(params)

    const month = useMemo(() => {
        const needMonth = months.find(month => month.id.includes(`/${params.year}/${params.month}`))
        return needMonth
    }, [params.year, params.month])
    const week = useMemo(() => {
        const needDays = month.days.filter(day => day.weekNumber == params.week)
        //[{}, {}, {}, {}, {}, {}, {}]
        console.log(needDays, 'needDays')
        return needDays
    }, [month, params.week])

    return (
        <>
            <WeekDaysRow />
            <HoursLayout>
                {week.map(day => <Day key={day.id} day={day} />)}
            </HoursLayout>
        </>
    )
}

export { WeekPage }