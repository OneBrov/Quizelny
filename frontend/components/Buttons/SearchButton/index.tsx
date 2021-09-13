import React from 'react'
import Image from 'next/image'
import {  IconButton, InputBase, Paper } from '@material-ui/core'
import styles from "./SearchButton.module.scss"

export const SearchButton:React.FC = () => {
    // const [isOpen, setIsOpen] = React.useState<boolean>(false)

    
    return (
        <div className={`d-flex mr-20`}>
            <Paper component="form"  className={styles.search}>
                <InputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type="submit" aria-label="search" className={styles.searchIcon}>
                    <Image src="/static/search.svg" width={25} height={25} alt="Search"/>
                </IconButton>
                
            </Paper>
        </div>
    )
}
