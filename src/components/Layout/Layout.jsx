import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../components'
import cl from './Layout.module.scss'

const Layout = () => {
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

export { Layout }