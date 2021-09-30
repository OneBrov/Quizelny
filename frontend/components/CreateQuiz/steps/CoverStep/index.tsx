import {  Divider, TextField, Typography } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import Cover from '../../../../src/store/Cover'
import { FileButton } from '../../../Buttons/FileButton'
import { QuizCard } from '../../../cards/QuizCard'


export const CoverStep = observer(() => {
    const [tagsLine, setTagsLine] = React.useState<string>('')
    const [image, setImage] = React.useState<File>()
    
    React.useEffect(() => {
        if (image) {
            Cover.changePictureFile(image)
        }
    }, [image])

    const handleTagsChange = (e: any) => {
        const clearList = e.target.value.split(',').map((val: string) =>
            val.trim().toLowerCase()    
        )
        setTagsLine(e.target.value)
        Cover.changeTags(clearList)
    } 

    return (
        <div className="d-flex justify-center flex-column">
            <div className="">
                <TextField
                    value={Cover.data.title} 
                    onChange={(e)=> Cover.changeTitle(e.target.value)}
                    fullWidth
                    variant="filled"
                    label="Название викторины"
                />

                <TextField 
                    value={tagsLine} 
                    onChange={handleTagsChange}
                    className="mt-10 mb-10"
                    fullWidth
                    variant="filled"
                    label="Основные темы викторины"
                />

                <FileButton 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setImage(e.target.files![0])}
                    type="image"    
                />
                    
            </div>
            <Divider className="mt-20" />
            <div className="mt-20 d-flex flex-column">
                <Typography variant="h4" color="primary">
                    Предпросмотр обложки
                </Typography>
                <div>
                    <QuizCard content={[]} name={Cover.data.title} tags={Cover.data.tags} src={Cover.data.image} />
                </div>
            </div>
            
        </div>
    )
})





