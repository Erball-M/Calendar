import React from 'react'
import classNames from 'classnames'
import cl from './Container.module.scss'

const Container = ({ children, className }) => {
    return (
        <div className={classNames(cl.container, className)}>
            {children}
        </div>
    )
}

export { Container }