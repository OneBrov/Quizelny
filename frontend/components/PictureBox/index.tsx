import React from 'react'
import styles from './PictureBox.module.scss'

interface PictureBoxProps {
    width?: string
    height?: string
    src: string
    
}

export const PictureBox:React.FC<PictureBoxProps> = ({width="200px", height="200px", src}) => {
    return (
        <div 
        className={styles.box}
        style={{
            width: width, 
            height:height, 
            background: "url(" + src + ")"
            }}
        >
        </div>
    )
}
