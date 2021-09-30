import {makeAutoObservable} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { QuizQuestionType, QuizRowType } from '../types/QuizTypes';


enableStaticRendering(typeof window === 'undefined')

 class FinalQuestions {
    title: String = '' //Final round title
    rows: QuizRowType[] = [] // for final round only 1 question per row
    currentQuestion: QuizQuestionType = {} as QuizQuestionType
    
    constructor() {
        makeAutoObservable(this, {}, {deep:true})
    }

    setCurrentQuestion(q:QuizQuestionType) {
        this.currentQuestion = q
    }

    deleteCurrentQuestion() {
        if (this.currentQuestion) {
            this.rows = this.rows.filter(({questions}) => questions[0] !== this.currentQuestion)
        }
    }

    addQuestion(title?: String) {
        this.rows.push({title: title || "", questions: [{} as QuizQuestionType ] })
    }

    deleteQuestion(questionId: any) {
        this.rows = this.rows.filter(({questions}, i)=> 
            i !== questionId
        )
    }

    changeTitle(questionId: any, title: String) {
        this.rows[questionId].title = title 
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