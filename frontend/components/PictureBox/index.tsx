import { Box, Paper } from '@material-ui/core'
import React from 'react'
import styles from './PictureBox.module.scss'

interface PictureBoxProps {
    width?: string
    height?: string
    src: string
    
}

export const PictureBox:React.FC<PictureBoxProps> = ({width="200px", height="200px", src}) => {
    return (
        <Paper 
        className={styles.box}
        elevation={2}
        style={{
            width: width, 
            height:height, 
            backgroundImage: "url(" + src + ")"
            }}
        >
        </Paper>
    )
}
