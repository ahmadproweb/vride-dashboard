import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

class BackendApiClient {
    private apiClient: AxiosInstance;
    constructor(baseURL: string) {
        this.apiClient = axios.create({
            baseURL: baseURL || import.meta.env.VITE_PUBLIC_URL,
            headers: {
                "Content-Type": "application/json"
            }
        })
    };

    async post<T, R>(endpoint: string, data: T, config?: AxiosRequestConfig): Promise<R | null> {
        try {
            const response: AxiosResponse<R> = await this.apiClient.post<R>(endpoint, data, config);
            return response.data;
        } catch (error) {
            this.errorHandler(error);
            return null;
        }
    }

    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T | null> {
        try {

            const response: AxiosResponse<T> = await this.apiClient.get(endpoint, config);
            return response.data
        } catch (error: any) {
            this.errorHandler(error);
            return null;

        }
    };

    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T | null> {
        try {
            const response: AxiosResponse<T> = await this.apiClient.delete(endpoint, config);
            return response.data;
        } catch (error: any) {
            this.errorHandler(error);
            return null;

        }
    };

    async put<T, R>(endpoint: string, data: T, config?: AxiosRequestConfig): Promise<R | null> {
        try {
            const response: AxiosResponse<R> = await this.apiClient.put(endpoint, data, config);
            return response.data;
        } catch (error: any) {
            this.errorHandler(error);
            return null;

        }
    }

    private errorHandler(error: any): void {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message || 'An error occurred';
            throw new Error(message);
        };
        throw new Error('An unexpected error has occured');

    }

};

export default BackendApiClient;

