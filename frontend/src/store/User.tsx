import axios from 'axios';
import {makeAutoObservable} from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import AuthService from '../api/services/AuthService';
import { QuizContentTypes, QuizCoverType, QuizFinalQuestionType, QuizQuestionType, QuizRowType } from '../types/QuizTypes';
import { AuthResponse } from '../types/responses/AuthResponse';
import { UserType } from '../types/UserType';

enableStaticRendering(typeof window === 'undefined')

 class UserStore {
    user = {} as UserType
    isAuth = false

    constructor() {
        makeAutoObservable(this, {}, {deep:true})
    }

    changeIsAuth(isAuth: boolean){
        this.isAuth = isAuth
    }

    changeUser(user: UserType) {
        this.user = user;
    }

    async login(email:string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.changeIsAuth(true)
            this.changeUser(response.data.user)
        } catch (err: any) {
            return err.response?.data?.message;
        }
    }

    async registration(email:string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            this.changeIsAuth(true)
            this.changeUser(response.data.user)
        } catch (err: any) {
            return err.response?.data?.message
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.changeIsAuth(false)
            this.changeUser({} as UserType)
            this.isAuth = false
            this.user = {} as UserType
        } catch (err: any) {
            console.log(err.response?.data?.message);
            
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(
                `${process.env.API_URL}/users/refresh`, {withCredentials: true}
            )
            localStorage.setItem('token', response.data.accessToken)
            this.changeIsAuth(true)
            this.changeUser(response.data.user)
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    async changeName(name: string) {
        try{ 
            const { data } = await AuthService.setName(name)
            console.log(data);
            this.setName(data)
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    setName(name: string) {
        this.user.name = name
    }

    async changeImage(image: File) {
        try{ 
            console.log(image);
            const token = localStorage.getItem('token')
            console.log(token);
            
            const {data} = await AuthService.setImage(image)
            console.log(data);
            this.setImage(data)
        } catch (err: any) {
            console.log(err.response?.data?.message);
        }
    }

    setImage(image: string) {
        this.user.image = image
    }

}

export default new UserStore()