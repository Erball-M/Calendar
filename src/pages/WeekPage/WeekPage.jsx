import React from 'react'
import classNames from 'classnames'
import { usePathnameEffect } from '../../hooks/usePathnameEffect'
import { Day, HoursLayout, WeekDaysRow } from '../../components/components'
import cl from './WeekPage.module.scss'

const WeekPage = () => {
    usePathnameEffect()
    return (
        <>
            <WeekDaysRow />
            {/* weekDay={0} */}
            <div className={classNames('scrollContainer')}>
                <HoursLayout>
                    {[0, 1, 2, 3, 4, 5, 6].map(i => <Day key={i} />)}
                </HoursLayout>
            </div>
        </>
    )
}

export { WeekPage }