import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import classNames from 'classnames'
import { useIDB, useMonthDays, useScrollNavigate } from '../../hooks/hooks'
import { addIndentToYear, getNeighborParams, getYearMonths } from '../../utils/dateUtils'
import { WeekDaysRow, MonthDays } from '../../components/components'
import cl from './MonthPage.module.scss'

const MonthPage = () => {
    const { year } = useParams()
    // const [months, setMonths] = useState(getYearMonths({ year }))
    const months = useOutletContext()
    const indenetedMonths = useMemo(() => addIndentToYear(months), [months, year])

    // useEffect(() => {
    //     async function start() {
    //         const months = await getAll()
    //     }
    //     start()
    // }, [year, IDB])

    const [containerRef, addAnchor] = useScrollNavigate()

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
            <div className={classNames(cl.grid, 'scrollContainer')} ref={containerRef}>
                {indenetedMonths.map(month => (<MonthDays key={month.id} month={month} ref={addAnchor} />))}
                {/* ref={containerRef} */}
            </div >
        </>
    )
}

export { MonthPage }