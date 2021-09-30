import { AxiosResponse } from "axios";
import { useRouter } from "next/dist/client/router";
import { QuizResponse } from "../../types/responses/QuizResponse";
import $api from "../http";

export default class GetQuizService {
    static async getAll(_id?: string, name?:string): Promise<AxiosResponse<QuizResponse[]>> {
  
        console.log(_id, name);
        
        return $api.get<QuizResponse[]>('/quizzes', {params: {id: _id, name: name}})
    }
}