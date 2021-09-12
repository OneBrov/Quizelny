import React from 'react'
import { MainButton } from '../MainButton'
import Image from 'next/image'
import styles from './ButtonWithIcon.module.scss'

interface ButtonWithIconProps {
    background: string
    text: string
    iconSrc: string
    width?: string
    height?: string 
    onClick: ()=>void
}

export const ButtonWithIcon:React.FC<ButtonWithIconProps> = ({
  background, text, iconSrc, width="400px", height="100px", onClick
}) => {
    return (
        <MainButton 
            width={width}
            height={height}
            fontSize="24px"
            background={background}
            onClick={onClick}
      >
        <div className="d-flex align-center ">
          <div className="d-flex flex-column mr-20 ">
            <span className={styles.text}> {text} </span>
          </div>
          <Image src={iconSrc} width={40} height={40} alt=""/>
        </div>  
      </MainButton>
    )
}


