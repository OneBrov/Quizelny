import { Button, Divider, IconButton, TextField, Tooltip, Typography } from '@material-ui/core'
import React, { HtmlHTMLAttributes } from 'react'
import { QuizQuestionType, QuizRowType } from '../../../../types/QuizTypes'
import { RoundTable } from '../../../Tables/RoundTable'
import Image from 'next/image'
import { ModalCreateQuestion } from "../../../modals/ModalCreateQuestion"
import { Update } from '@material-ui/icons'
import produce from 'immer'

const mockRows:QuizRowType[] = [
    {title:"title 1", row: [{price: 100}, {price: 200}, {price: 300}]},
    {title:"title 2", row: [{price: 100}, {price: 200}, {price: 300}]},
    {title:"title 3", row: [{price: 100}, {price: 200}, {price: 300}]},
    {title:"title 4", row: [{price: 100}, {price: 200}, {price: 300}]},
    {title:"title 5", row: [{price: 100}, {price: 200}, {price: 300}]}
]


export const RoundStep = () => {
    const [rows, setRows] = React.useState<QuizRowType[] >([])
    const [inputTheme, setInputTheme] = React.useState<String>("")

    const [currentQuestion, setCurrentQuestion] = 
        React.useState<QuizQuestionType>()
    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)

    const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTheme(e.target.value)
    }

    const handleAddRow = ():void => {
        const theme = inputTheme
        setRows(prev=> [...prev, {title: theme, row: [] }])
        setInputTheme("")
    } 

    const handleChangeRowTitle = (e:any, id:Number): void => {
        setRows(prev =>
            prev.map(( value, step) =>
                 step === id ?  {...value,  title: e.target.value}  : value
            )
        )
    }

    const handleRemoveRow = (id: Number):void => {
        setRows(prev =>
            prev.filter((value, step)=> 
                step !== id
        ))
    }

    const handleAddQuestion = (price:Number = 0, id: Number) => {
        setRows(prev => 
            prev.map((value, step)=>
                step===id ? 
                {
                    ...value, 
                    row: [...value.row, {price: price, text: "", answer: "", row: step}]
                }
                : value
            )
        )
    }

// removing question by link
    const handleRemoveQuestion = (question: QuizQuestionType) => {
        setRows(prev => 
            prev.map((value, step)=>
            step===question.row ? 
            {
                ...value, 
                row: value.row.filter(q => q!==question)
            }
            : value
        )
        )
    }

    console.log(currentQuestion);
    
    const handleChangePrice = (e:any, question: QuizQuestionType) => {
  
        setRows(prev => 
            prev.map((value, step)=>
            step===question.row ? 
            {
                ...value, 
                row: value.row.map(q => q === question ? {...q, price: Number(e.target.value)} : q )
            }
            : value
        ))
    }


    const handleClickQuestion = (q:QuizQuestionType) => {
        setCurrentQuestion(q)
        setModalIsOpen(true)
    }



    return (
        <div>
            {currentQuestion && 
            <ModalCreateQuestion 
                isOpen={modalIsOpen}  
                onClose={()=> setModalIsOpen(false)}
                onDelete={() => handleRemoveQuestion(currentQuestion)}
                question={currentQuestion}
                onChangePrice={handleChangePrice}
            />}
           
            <div>
                {rows.map((row, rowId)=>
                    <div key={rowId} className="mt-20 mb-40">
                        <div className="d-flex justify-between">
                            <Typography variant="h6">
                                <span> Тема {` ${rowId + 1}:`}</span>
                                <TextField 
                                    value={row.title} 
                                    onChange={(e) => handleChangeRowTitle(e, rowId)}
                                    className="ml-20" 
                                />
                                <Tooltip title="Удалить тему и все созданные вопросы">
                                    <IconButton onClick={() => handleRemoveRow(rowId)}  component="span">
                                        <Image src="/static/remove.svg" width={24} height={24} alt="Remove"  />
                                    </IconButton>
                                </Tooltip> 
                            </Typography>
                            <Typography variant="body1">
                                {`Количество вопросов: ${row.row.length}`}
                            </Typography>
                        </div>
                        <div className="ml-20">

                        <RoundTable  
                            onClickCell={handleClickQuestion}
                            isCreation
                            onCreate={()=> handleAddQuestion(200, rowId)}
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
                    data={rows}
                />
            </div>

        </div>
    )
}


