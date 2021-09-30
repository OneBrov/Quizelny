import { Button, Divider, IconButton, TextField, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import { QuizQuestionType } from '../../../../src/types/QuizTypes'
import { RoundTable } from '../../../Tables/RoundTable'
import Image from 'next/image'
import { ModalCreateQuestion } from "../../../modals/ModalCreateQuestion"
import QuestionRows from '../../../../src/store/QuestionRows'
import { observer } from 'mobx-react-lite'

// const mockRows:QuizRowType[] = [
//     {title:"title 1", row: [{price: 100}, {price: 200}, {price: 300}]},
//     {title:"title 2", row: [{price: 100}, {price: 200}, {price: 300}]},
//     {title:"title 3", row: [{price: 100}, {price: 200}, {price: 300}]},
//     {title:"title 4", row: [{price: 100}, {price: 200}, {price: 300}]},
//     {title:"title 5", row: [{price: 100}, {price: 200}, {price: 300}]}
// ]

export const RoundStep = observer(() => {
    // const [rows, setRows] = React.useState<QuizRowType[] >([])
    const rows = QuestionRows.rows

    const [inputTheme, setInputTheme] = React.useState<String>("")

    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)

    const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTheme(e.target.value)
    }

    const handleAddRow = ():void => {
        const theme = inputTheme
        QuestionRows.addRow(theme)
        setInputTheme("")
    } 

    const handleClickQuestion =  (q:QuizQuestionType) => {
        QuestionRows.setActiveQuestion(q)
        setModalIsOpen(true)
    }

    return (
        <div>
            {QuestionRows.activeQuestion && 
            <ModalCreateQuestion 
                isOpen={modalIsOpen}  
                onClose={()=> setModalIsOpen(false)}
                onDelete={() => QuestionRows.deleteCurrentQuestion()}
                question={QuestionRows.activeQuestion}
                
            />}
           
            <div>
                {rows.map((row, rowId)=>
                    <div key={rowId} className="mt-20 mb-40">
                        <div className="d-flex justify-between">
                            <Typography variant="h6">
                                <span> Тема {` ${rowId + 1}:`}</span>
                                <TextField 
                                    value={row.title} 
                                    onChange={(e) => QuestionRows.changeRowTitle(rowId, e.target.value )}
                                    className="ml-20" 
                                />
                                <Tooltip title="Удалить тему и все созданные вопросы">
                                    <IconButton onClick={() => QuestionRows.deleteRow(rowId)}  component="span">
                                        <Image src="/static/remove.svg" width={24} height={24} alt="Remove"  />
                                    </IconButton>
                                </Tooltip> 
                            </Typography>
                            <Typography variant="body1">
                                {`Количество вопросов: ${row.questions.length}`}
                            </Typography>
                        </div>
                        <div className="ml-20">

                        <RoundTable  
                            onClickCell={handleClickQuestion}
                            isCreation
                            onCreate={()=> QuestionRows.addQuestion(rowId, 300)}
                            data={[rows[rowId]]}
                        />
                        </div>
                    </div>
                )}
            </div>
            <Divider/>
            <div className="mb-20 mt-20">
                <TextField
                        value={inputTheme} 
                        onChange={handleTheme}
                        fullWidth
                        variant="filled"
                        label="Название темы"
                />
                <Button
                    onClick={handleAddRow}
                    className="mt-10 "
                    variant="contained"
                    component="label"
                >
                    Создать тему
                </Button>
            </div>
            <Divider/>
            <div className="mt-20 mb-20 ">
                <Typography className="mb-10" variant="h5">
                    Предпросмотр Раунда
                </Typography>
                <RoundTable  
                    onClickCell={()=>console.log("Clicked on Cell!!!")}
                    data={QuestionRows.rows}
                />
            </div>
        </div>
    )
})


