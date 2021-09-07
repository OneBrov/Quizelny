import { Box, Button, Divider, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { QuizCard } from '../../../cards/QuizCard'
import styles from './CoverStep.module.scss'
export const CoverStep = () => {

    const [quizName, setQuizName] = React.useState<string>('')
    const [tagsLine, setTagsLine] = React.useState<string>('')
    const [tags, setTags] = React.useState<string[]>([])


    const handleTagsChange = (e) => {
        const clearList = e.target.value.split(',').map((val: string) =>
            val.trim().toLowerCase()    
        )
        setTagsLine(e.target.value)
        setTags(clearList)
    } 

    return (
        <div className="d-flex justify-center flex-column">
            <div className="">
                <TextField
                    value={quizName} 
                    onChange={(e)=> setQuizName(e.target.value)}
                    fullWidth
                    variant="filled"
                    label="Название викторины"
                />

                <TextField 
                    value={tagsLine} 
                    onChange={handleTagsChange}
                    className="mt-10 "
                    fullWidth
                    variant="filled"
                    label="Основные темы викторины"
                />

                <Button
                    className="mt-20 "
                    variant="contained"
                    component="label"
                >
                    Загрузить изображение
                <input
                    type="file"
                    accept="image/*"
                    hidden
                />
                </Button>
            </div>
            <Divider className="mt-20" />
            <div className="mt-20 d-flex flex-column">
                <Typography variant="h4" color="primary">
                    Предпросмотр обложки
                </Typography>
                <div>
                    <QuizCard tags={tags} name={quizName} />
                </div>
            </div>
            
        </div>
    )
}





