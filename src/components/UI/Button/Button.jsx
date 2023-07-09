import React, { forwardRef } from 'react'
import classNames from 'classnames'
import cl from './Button.module.scss'

const Button = forwardRef(({
    children,
    className,
    variant = 'default', //transparent
    large,
    ...props
}, ref) => {
    return (
        <button
            className={classNames(
                cl.button,
                cl[variant],
                large && cl.large,
                className,
            )}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})

export { Button }