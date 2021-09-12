import { makeAutoObservable, toJS } from "mobx"
import { enableStaticRendering } from "mobx-react-lite"
import { QuizRowType } from "../../types/QuizTypes"
import { QuestionRows } from "./QuestionRows"

enableStaticRendering(typeof window === 'undefined')

class RoundsStore {
    rounds: any = []
    
    constructor() {
        const round = new QuestionRows()
        
        this.rounds.push(round)
        makeAutoObservable(this)
        
    }

    getRoundStore(roundId: any) {
        return this.rounds[roundId]
    }

}

export default new RoundsStore() 