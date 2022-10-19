import axios from "axios"

export const urlBase = "http://127.0.0.1:8000/api";

export const http = () => {

    const token = localStorage.getItem("access_token");

    // configuración de Interceptor
    const interceptor = axios.create({
        baseURL: urlBase,
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        timeout: 30000
    });

    // errores
    // captura de errores (401, 403)
    interceptor.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if(error.response.status === 401){
                localStorage.removeItem("access_token");
                window.location.href = "/login"
            }

            return Promise.reject(error);
        }
    )

    return interceptor;
}