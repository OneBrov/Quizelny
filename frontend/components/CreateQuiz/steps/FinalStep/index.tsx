import { Button, Divider, IconButton, TextField, Tooltip, Typography } from '@material-ui/core'
import React from 'react'
import FinalQuestions from '../../../../src/store/FinalQuestions'
import { QuizFinalQuestionType } from '../../../../src/types/QuizTypes'
import { FinalTable } from '../../../Tables/FinalTable/indes'
import Image from "next/image"
import { observer } from 'mobx-react-lite'
import { ModalCreateFinalQuestion } from '../../../modals/ModalCreateFinalQuestion'
import { ModalCreateCompleted } from '../../../modals/ModalCreateCompleted'
// const mockQuestions:QuizFinalQuestionType[] = [
//     {title: "one", text: "omega", answer: "pepega"},
//     {title: "two", text: "omega", answer: "pepega"},
//     {title: "three", text: "omega", answer: "pepega"},
//     {title: "four", text: "omega", answer: "pepega"},

// ]

export const FinalStep = observer(() => {
    const [questionTitle, setQuestionTitle] = React.useState<String>("")
    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)
    const [quizCreationComplete, setQuizCreationComplete] = React.useState<boolean>(false)


    const handleAddQuestion = () => {
        FinalQuestions.addQuestion(questionTitle)
        setQuestionTitle("")
    } 

    const handleClickQuestion =  (q:QuizFinalQuestionType) => {
        FinalQuestions.setCurrentQuestion(q)
        setModalIsOpen(true)
    }

    const handleUploadQuiz = () => {
        console.log("Uploaded :)");
        
    }

    return (
        <div>
            {FinalQuestions.activeQuestion&&
                <ModalCreateFinalQuestion 
                isOpen={modalIsOpen}
                question={FinalQuestions.activeQuestion}
                onClose={()=> setModalIsOpen(false)}
                onDelete={()=> FinalQuestions.deleteCurrentQuestion()}
            />}
            <div>
                {FinalQuestions.questions.map((row, rowId)=>
                    <div key={rowId} className="mt-20 mb-40">
                        <div className="d-flex justify-between">
                            <Typography variant="h6">
                                <span> Вопрос {` ${rowId + 1}:`}</span>
                                <TextField 
                                    value={row.title} 
                                    onChange={(e) => FinalQuestions.changeTitle(rowId, e.target.value )}
                                    className="ml-20" 
                                />
                                <Tooltip title="Удалить вопрос">
                                    <IconButton onClick={() => FinalQuestions.deleteQuestion(rowId)}  component="span">
                                        <Image src="/static/remove.svg" width={24} height={24} alt="Remove"  />
                                    </IconButton>
                                </Tooltip> 
                            </Typography>
                        </div>
                        <div className="ml-20">
                        <FinalTable 
                            data={[row]} 
                            onClickQuestion={handleClickQuestion}
                        />
                        </div>
                    </div>
                )}
            </div>
            <Divider/>
            <div className="mb-20 mt-20">
                <TextField
                        value={questionTitle} 
                        onChange={(e)=> setQuestionTitle(e.target.value)}
                        fullWidth
                        variant="filled"
                        label="Заголовок финального вопроса"
                />
                <Button
                    onClick={handleAddQuestion}
                    className="mt-10 "
                    variant="contained"
                    component="label"
                >
                    Создать вопрос
                </Button>
            </div>
  
            <Divider />
            <div className="mt-20 mb-20 ">
                <Typography className="mb-20" variant="h5">
                    Предпросмотр финального раунда
                </Typography>
                <FinalTable  
                    data={FinalQuestions.questions}
                    onClickQuestion={()=>console.log("Clicked!!!")}
                />
            </div>
             
            <Divider />
            
            <div>
                <ModalCreateCompleted  
                    isOpen={quizCreationComplete} 
                    onClose={()=> setQuizCreationComplete(false)}
                    onUploadQuiz={handleUploadQuiz}

                />
                <Button
                    onClick={()=> setQuizCreationComplete(true)}
                    className="mt-10 "
                    variant="contained"
                    size="large"
                    component="label"
                    color="secondary"
                >
                    <Typography variant="body1" color="primary">
                        Завершить создание викторины
                    </Typography>
                   
                </Button>

            </div>
        </div>
    )
})
