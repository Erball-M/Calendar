import React from 'react'
import classNames from 'classnames'
import cl from './Button.module.scss'

const Button = ({
    children,
    ico,
    className,
    variant = 'default',
    large,
    ...props
}) => {
    return (
        <button
            className={classNames(
                cl.button,
                cl[variant],
                large && cl.large,
                className,
            )}
            {...props}
        >
            {ico && <div className={cl.ico}>{ico}</div>}
            {children}
        </button>
    )
}

export { Button }