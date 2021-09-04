import { Box, Link, Typography } from '@material-ui/core'
import React from 'react'
import styles from './Navbar.module.scss'

const links = [
    {text: "Главная", href:"/"},
    {text: "Комнаты", href:"/rooms"},
    {text: "Викторины", href:"/quizzes"},
]


export const Navbar = () => {
    return (
        
            <Box className={styles.nav} display="flex" height="70px" minHeight="70px" justifyContent="center" alignItems="center">
                {links.map( (link, it) =>
                    <Typography key={it} className={ it>0 ? "ml-20" : ""} variant="h5" color="inherit">
                        <Link href={link.href} className={styles.link} >{link.text}</Link>
                    </Typography>
                )}

                <Box right="20px" position="absolute">
                    <span className={styles.brand}>Quizelny</span>
                </Box>
            </Box>
        
    )
}

