import React from 'react'
import Image from 'next/image'
import {  IconButton, InputBase, Paper } from '@material-ui/core'
import styles from "./SearchButton.module.scss"

interface SearchButtonProps {
    onChange: (value: string) => void
}

export const SearchButton:React.FC<SearchButtonProps> = ({
    onChange
}) => {
    // const [isOpen, setIsOpen] = React.useState<boolean>(false)

    return (
        <div className={`d-flex mr-20`}>
            <Paper component="form"  className={styles.search}>
                <InputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChange(e.target.value)}
                />
                <IconButton  aria-label="search" className={styles.searchIcon}>
                    <Image src="/static/search.svg" width={25} height={25} alt="Search"/>
                </IconButton>
                
            </Paper>
        </div>
    )
}
