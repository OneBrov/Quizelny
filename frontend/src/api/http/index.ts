import axios from "axios";
import { AuthResponse } from "../../types/responses/AuthResponse";

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.API_URL
})

$api.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    (config) => config,
    async (err) => {
        const originalRequest = err.config
        if (err.response.status == 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<AuthResponse>(
                    `${process.env.API_URL}/users/refresh`, {withCredentials: true})
                localStorage.setItem('token', response.data.accessToken)
                return $api.request(originalRequest)
            } catch (e) {
                console.log("Пользователь не авторизован");
            } 
        } throw err
    }

    )

export default $api