import { Button, ButtonBase } from '@material-ui/core'
import React from 'react'
import styles from './MainButton.module.scss'
interface MainButtonProps {
    background?: string
    width: string
    height: string
    fontSize: string
}

export const MainButton:React.FC<MainButtonProps> = ({children, background, width, height, fontSize=18 }) => {
    return (
        <ButtonBase 
            className={styles.button}
            focusRipple  
            style={{background: background, 
                width: width, 
                height: height, 
                fontWeight: "bold", 
                fontSize: fontSize,
                borderRadius: "25px"    
            }}
        >
            {children}
        </ButtonBase>
    )
}

