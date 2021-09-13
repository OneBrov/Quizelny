import React from 'react'
import styles from './QuizWindow.module.scss'

interface QuizWindowProps {

}

export const QuizWindow:React.FC<QuizWindowProps> = () => {
    return (
        <div className={`${styles.window} h100p`}>
            window
        </div>
    )
}
