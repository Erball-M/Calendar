import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getMonthDays } from '../../utils/dateUtils'
import { usePathnameEffect, useMonthDays } from '../../hooks/hooks'
import { } from '../../components/components'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    const params = useParams()

    usePathnameEffect(params)

    const month = useMonthDays()
    console.log(month)

    return (
        <div className={cl.wrapper}>
            {month.days.map(item => <div key={item.date}>{item.date}</div>)}
        </div>
    )
}

export { MonthPage }