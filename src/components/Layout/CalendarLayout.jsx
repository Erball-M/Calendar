import React from 'react'
import { Outlet } from 'react-router-dom'
import { usePathnameEffect } from '../../hooks/usePathnameEffect'
import { Header, Sidebar } from '../components'
import cl from './CalendarLayout.module.scss'

const CalendarLayout = () => {
    usePathnameEffect()

    return (
        <div className={cl.layout}>
            <Sidebar />
            <main className={cl.main}>
                <Header />
                <div className={cl.calendar}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export { CalendarLayout }