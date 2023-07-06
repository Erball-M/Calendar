import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import { useMonthDays, useScrollNavigate } from '../../hooks/hooks'
import { addIndentToYear, getNeighborParams, getYearMonths } from '../../utils/dateUtils'
import { WeekDaysRow, MonthDay } from '../../components/components'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    const { year } = useParams()

    const [months, setMonths] = useState(addIndentToYear(getYearMonths({ year })))

    // const [containerRef, addAnchor] = useScrollNavigate()

    // const months = useMonthDays(true)
    // useEffect(() => {
    // const currentYearMonths = getYearMonths({ year })

    // const prevYearParams = getNeighborParams({ year }, false)
    // const prevYearMonths = getYearMonths(prevYearParams)

    // const nextYearParams = getNeighborParams({ year }, true)
    // const nextYearMonths = getYearMonths(nextYearParams)

    // const advancedMonths = addIndentToYear(currentYearMonths)
    // ...prevYearMonths, ...currentYearMonths, ...nextYearMonths

    // setMonths(advancedMonths)
    // }, [year])

    return (
        <>
            <WeekDaysRow />
            <div className={classNames(cl.grid, 'scrollContainer')} > {/* ref={containerRef} */}
                {
                    months.map(month => (
                        <Fragment key={month.id}>
                            {month.days.map(day => (<MonthDay key={day.id} day={day} />))} {/* ref={addAnchor} */}
                        </Fragment>
                    ))
                }
            </div >
        </>
    )
}

export { MonthPage }