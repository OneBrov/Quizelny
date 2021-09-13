import { Box, Divider, Typography } from '@material-ui/core'
import React from 'react'
// import styles from './TitleLine.module.scss' 

interface TitleLineProps {
    mainTitle: string
    secondaryTitle?: any
    secondaryTitleType?: "string" | ChildNode
}

export const TitleLine:React.FC<TitleLineProps> = ({mainTitle="", secondaryTitle="", children=""}) => {
    return (
        <>
        <Box  marginTop="10px" display="flex" justifyContent="space-between" alignItems="center" color="#fff">
            <Typography variant="h3" className="ml-40"> {mainTitle}</Typography>
            {!children ? 
                <Typography variant="h3"> {secondaryTitle}</Typography>: 
                <div>
                    {children}
                </div>
                
            }
            
        </Box>
        <Divider className="mt-10"/>
        </>
    )
}
