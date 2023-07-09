import React from 'react'
import classNames from 'classnames'
import cl from './IcoWrapper.module.scss'

const IcoWrapper = ({ children, className, style }) => {
    return (
        <div className={classNames(cl.ico, className)} style={style}>
            {children}
        </div>
    )
}

export { IcoWrapper }