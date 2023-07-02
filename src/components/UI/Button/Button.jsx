import React from 'react'
import classNames from 'classnames'
import cl from './Button.module.scss'

const Button = ({
    children,
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
            {children}
        </button>
    )
}

export { Button }