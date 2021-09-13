import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { PictureBox } from '../../PictureBox'

interface UserCardProps {
    image?: String
    name: String
    className?: String
}

export const UserCard:React.FC<UserCardProps> = ({
    image = "/static/noUserPicture.svg", name, className
}) => {
    return (
        <div className={clsx(className, "d-flex flex-column align-center")}  >
            <PictureBox  src={image.toString()}  />
            <Typography variant="h6" align="center"  >
                {name}
            </Typography>
        </div>
    )
}
