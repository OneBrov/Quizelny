import {makeAutoObservable} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { QuizContentTypes, QuizCoverType, QuizQuestionType, QuizRowType } from '../types/QuizTypes';

enableStaticRendering(typeof window === 'undefined')

 class Cover {
    data:QuizCoverType = {title: "No title", tags: [], image: "/static/noPicture.svg"}
    
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
        this.data.image = picture
    }

    changePictureFile(picture: File) {
        this.data.imageFile = picture
        this.changePicture(URL.createObjectURL(this.data.imageFile))
    }

}

export default new Cover()