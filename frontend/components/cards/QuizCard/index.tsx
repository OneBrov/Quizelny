import { Chip, Divider, IconButton, Paper, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import Image from 'next/image'
import styles from './QuizCard.module.scss'
import { QuizRowWithTitle } from '../../../src/types/responses/QuizResponse'

interface QuizCardProps {
    size?: "sm" | "md" | "lg"
    src?: String
    name: String
    tags: String[]
    playCount?: Number
    content: {title: string, rows: QuizRowWithTitle[]}[]
}

const sizes = {
    sm: ["100px", "120px"],
    md: ["300px", "250px"],
    lg: ["400px", "480px"],
}




export const QuizCard:React.FC<QuizCardProps> = ({
    size="md", src="/static/noPicture.svg", name, tags, playCount=0, content=[]
}) => {
    console.log(content);
    return (
        <div className="d-flex  mt-10 mb-10">
            <Paper elevation={3} className={styles.card} style={{
                width:sizes[size][0], 
                height: sizes[size][1],
                backgroundImage: "url(" + src + ")",
                backgroundColor: "#C4C4C4", 
            }}   
            >
                <div className="d-flex flex-column h100p flex">
                        <div className="d-flex justify-end">
                            <div className={`${styles.upper} d-flex align-center `}>
                            <Tooltip title="Количество сыгранных игр">
                                <div className="d-flex align-center">
                                    <Image src="/static/count.svg" width={20} height={20} alt="Play count"/>
                                    <span className="ml-5">{playCount}</span>
                                </div>
                            </Tooltip>
                            <Tooltip className="d-flex align-center" title="Создать комнату с этой викториной">
                                <IconButton color="primary" aria-label="export quiz">
                                    <Image src="/static/export.svg" width={20} height={20} alt="Play count"/>
                                </IconButton>
                            </Tooltip>
                            </div>
                        </div>

                    <div className={`d-flex flex-wrap justify-end ${styles.bottom}`}>
                        {tags.map((tag, iter)=>
                            <Chip color="primary"  variant="outlined" className="mr-5 mt-10 mb-10" key={iter}  label={tag}/>
                        )}
                    </div>
                </div>                         
            </Paper>
            <div className={`d-flex flex-column  flex ${styles.contentBackground}`} >
                <Typography className="ml-20" color="primary" variant="h4">
                    {name}
                </Typography>
                <div className="d-flex flex-column">
                    {content.map(({title, rows}, iter) => 
                        <div key={iter} className="d-flex flex-column">
                            <div >
                                <Typography color="primary" className="text-center" variant="h5">
                                    {title}
                                </Typography>  
                                <div className={`${styles.row} d-flex pl-10 pr-10 flex-wrap`}> 
                                    {rows?.map((val,themeCounter) => 
                                        <div key={themeCounter}  className="d-flex ">
                                            {(themeCounter > 0) && 
                                                (<Divider className={`${styles.divider} opacity-3`}  orientation="vertical" flexItem />)
                                            }
                                            <Typography  className="mr-10 ml-10 " variant="body1">
                                                {val.title}
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </div>
    )
}


