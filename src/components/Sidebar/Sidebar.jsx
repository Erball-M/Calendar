import React from 'react'
import { Container } from '../components'
import cl from './Sidebar.module.scss'

const Sidebar = () => {
    return (
        <div className={cl.sidebar}>
            <div className={cl.container}>
                SB
            </div>
        </div>
    )
}

export { Sidebar }