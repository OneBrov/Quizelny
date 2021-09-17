import {makeAutoObservable} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import {  QuizFinalQuestionType } from '../../types/QuizTypes';

enableStaticRendering(typeof window === 'undefined')

 class FinalQuestions {
    questions:QuizFinalQuestionType[] = []
    currentQuestion:QuizFinalQuestionType | null = {title: "" || "", text: "", answer: ""}

    constructor() {
        makeAutoObservable(this, {}, {deep:true})
    }

    setCurrentQuestion(q:QuizFinalQuestionType) {
        this.currentQuestion = q
    }

    deleteCurrentQuestion() {
        if (this.currentQuestion) {
            this.questions = this.questions.filter(q => q !== this.currentQuestion)
        }
    }

    addQuestion(title?: String) {
        this.questions.push({title: title || "", text: "", answer: ""})
    }

    deleteQuestion(questionId: any) {
        this.questions = this.questions.filter((q, i)=> 
            i !== questionId
        )
    }

    changeTitle(questionId: any, title: String) {
        this.questions[questionId].title = title 
    }


    changeText(text: String) {
        if (this.currentQuestion) {
            this.currentQuestion.text = text
        }
    }

    changeAnswer(answer: String) {
        if (this.currentQuestion) {
            this.currentQuestion.answer = answer
        }
    }

    get activeQuestion () {
        return this.currentQuestion
    }   

}

export default new FinalQuestions()