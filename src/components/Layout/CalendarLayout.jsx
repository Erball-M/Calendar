import React, { useMemo } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { usePathnameEffect } from '../../hooks/usePathnameEffect'
import { Header, Sidebar } from '../components'
import cl from './CalendarLayout.module.scss'
import { getYearMonths } from '../../utils/dateUtils'

const CalendarLayout = ({ togglePanel }) => {
    usePathnameEffect()

    const params = useParams()
    const months = useMemo(() => {
        const res = getYearMonths(params.year)
        return res
    }, [params.year])

    return (
        <div className={cl.layout}>
            <Sidebar />
            <main className={cl.main}>
                <Header />
                <div className={cl.calendar} onClick={togglePanel}>
                    <Outlet context={months} />
                </div>
            </main>
        </div>
    )
}

export { CalendarLayout }