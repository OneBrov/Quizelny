import React from 'react'
import styles from './QuizTable.module.scss'

export const QuizTable:React.FC = ({children}) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                {children}
            </tbody>
        </table>
    )
}
