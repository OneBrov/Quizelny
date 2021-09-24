import { AxiosResponse } from 'axios'
import { AuthResponse } from '../../types/responses/AuthResponse'
import $api from '../http'

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/users/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>('/users/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return await $api.post('/users/logout')
    }

    static async setName(name: string) {
        return await $api.post('/users/setName', {name})
    }

    static async setImage(image: File) {
        const formData = new FormData()
        formData.append("image", image);
        return await $api.post('/users/setImage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
    }
}