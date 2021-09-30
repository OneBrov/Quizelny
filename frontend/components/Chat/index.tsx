import { Box, Card, CardActionArea, CardActions } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { Room } from '../../src/store/Room'


interface ChatProps {
    className?: string
}

export const Chat:React.FC<ChatProps> = ({
    className
}) => {
    return (
        <Box width="200px" minHeight={100} display="flex" paddingLeft="10px" className={clsx(className)} >
            <Card className="flex-auto" variant="outlined" >
                chat
            </Card>
        </Box>
    )
}
