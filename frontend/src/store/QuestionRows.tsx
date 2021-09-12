import {makeAutoObservable} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { QuizContentTypes, QuizQuestionType, QuizRowType } from '../../types/QuizTypes';

enableStaticRendering(typeof window === 'undefined')

 class QuestionRows {
    rows:QuizRowType[] = [  
        // {title:"title 1", questions: [{price: 111, row: 0}, {price: 200}, {price: 300}]},
        // {title:"title 2", questions: [{price: 20, row: 1}, {price: 200}, {price: 300}]},
        // {title:"title 3", questions: [{price: 30, row: 2}, {price: 200}, {price: 300}]},
        // {title:"title 4", questions: [{price: 40, row: 3}, {price: 200}, {price: 300}]},
        // {title:"title 5", questions: [{price: 50, row: 4}, {price: 200}, {price: 300}]}
    ]
    currentQuestion:QuizQuestionType | null = {price: 0, text: "placeHolder", answer: "No"}

    constructor(lastRows?: QuizRowType[]) {
        this.rows = lastRows || this.rows
        this.currentQuestion = {price: 0, text: "placeHolder", answer: "No"}
        makeAutoObservable(this, {}, {deep:true})
    }

    addRow(title?: String) {
        this.rows = [...this.rows, {title: title || "", questions: [] }]
    }

    deleteRow(rowInd: Number){
        this.rows = this.rows.filter((value, step)=> 
            step !== rowInd
        )
    }

    changeRowTitle(rowId: any, title: String){
        this.rows[rowId].title = title
    }

    addQuestion(rowId: any, price?: Number) {
        this.rows[rowId].questions.push({price: price || 200, text: "", answer: "", row: rowId})
    }

    deleteCurrentQuestion() {
        if (this.currentQuestion) {
            const id: any = this.currentQuestion.row
            this.rows[id].questions =  this.rows[id].questions.filter(q => q!==this.currentQuestion)
            this.currentQuestion = null
        }
    }

    setActiveQuestion(question: QuizQuestionType) {
        this.currentQuestion = question
    }

    changeQuestionPrice(e: Number) {
        if (this.currentQuestion){
            this.currentQuestion.price = e
        }
    }

    changeQuestionText(e: String) {
        if (this.currentQuestion){
            this.currentQuestion.text = e
        }
    }

    changeQuestionType(e: QuizContentTypes) {
        if (this.currentQuestion){
            this.currentQuestion.type = e
        }
    }

    changeQuestionAnswer(e: String) {
        if (this.currentQuestion){
           this.currentQuestion.answer = e 
        }
    }

    changeQuestionWrongAnswer(e: String) {
        if (this.currentQuestion){
            this.currentQuestion.wrongAnswers = e
        }
    }

    get activeQuestion () {
        return this.currentQuestion
    }   

}

export default new QuestionRows()