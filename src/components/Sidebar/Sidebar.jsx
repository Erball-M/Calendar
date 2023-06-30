import React from 'react'
import { Container } from '../components'
import cl from './Sidebar.module.scss'

const Sidebar = () => {
    return (
        <div className={cl.sidebar}>
            <Container>
                SB
            </Container>
        </div>
    )
}

export { Sidebar }