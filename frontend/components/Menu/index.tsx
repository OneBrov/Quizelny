import React from 'react'
import styles from './Menu.module.scss'
import Image from 'next/image'
import Home from '../../public/static/home.svg'
import Person from '../../public/static/profile.svg'
import VolumeUp from '../../public/static/sound.svg'
import Settings from '../../public/static/settings.svg'
import {  ButtonBase, Typography } from '@material-ui/core'
import {  useRouter } from 'next/dist/client/router'



    


export const LeftMenu: React.FC = () => {

    const router = useRouter()

    const menu = [
        {text:"Главная", icon: Home, onClick: ()=>router.push("/") },
        {text:"Профиль", icon: Person, onClick: ()=>router.push("/profile") },
        {text:"Громкость", icon: VolumeUp},
        {text:"Настройки", icon: Settings},
    ]
   
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    return (
        <div onMouseOver={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>
            <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
                {menu.map((item)=>
                    <ButtonBase key={item.text} onClick={item.onClick ? item.onClick : () => console.log("On Click not found")}  >
                        <div  className={`${styles.menuItem} d-flex align-center mb-10`}>
                            <div className={styles.icon}>
                                <Image 
                                    src={item.icon} width={50} 
                                    height={50} 
                                    alt={item.text}
                                />
                            </div>
                            <Typography variant="h6" >{item.text}</Typography>
                        </div>
                    </ButtonBase >
                )}
            </div>
        </div>
    )
}




