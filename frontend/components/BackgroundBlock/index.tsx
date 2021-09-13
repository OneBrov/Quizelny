import clix from 'clsx'
import React from 'react'
import styles from './BackgroundBlock.module.scss'

interface BackgroundBlockProps {
    className: String
}

export const BackgroundBlock:React.FC<BackgroundBlockProps> = ({
    children, className
}) => {
    return (
        <div className={clix(styles.back, className)} >
            {children}
        </div>
    )
}
