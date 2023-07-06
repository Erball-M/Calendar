import React from 'react'
import classNames from 'classnames'
import { Day, HoursLayout, WeekDaysRow } from '../../components/components'
import cl from './WeekPage.module.scss'

const WeekPage = () => {
    return (
        <>
            <WeekDaysRow />
            <HoursLayout>
                {[0, 1, 2, 3, 4, 5, 6].map(i => <Day key={i} />)}
            </HoursLayout>
        </>
    )
}

export { WeekPage }