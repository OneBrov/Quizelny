import {makeAutoObservable} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { QuizContentTypes, QuizCoverType, QuizFinalQuestionType, QuizQuestionType, QuizRowType } from '../../types/QuizTypes';

enableStaticRendering(typeof window === 'undefined')

 class FinalQuestions {
    data:QuizCoverType = {title: "No title", tags: [], picture: "/static/noPicture.svg" }
    currentQuestion:QuizFinalQuestionType | null = {title: "" || "", text: "", answer: ""}

    constructor() {
        makeAutoObservable(this, {}, {deep:true})
    }

    changeTitle(title: String){
        this.data.title = title
    }

    changeTags(tags: String[]) {
        this.data.tags = tags
    }

    changePicture(picture: String) {
        this.data.picture = picture
    }

}

export default new FinalQuestions()