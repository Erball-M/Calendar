import React from 'react'
import classNames from 'classnames'
import cl from './Toggler.module.scss'

const Toggler = ({ children, value, onClick, className }) => {
    return (
        <label className={classNames(cl.label, className)}>
            <button className={cl.button} onClick={onClick}>
                <div className={classNames(cl.inside, value && cl.insideOn)}>
                    <div className={classNames(cl.dot, value && cl.dotOn)} />
                </div>
            </button>
            {children}
        </label >
    )
}

export { Toggler }