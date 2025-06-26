import type { Car } from "@/types/Vehicles";
import BackendApiClient from "./BackendAPIClient";

class AdminServices{
    private apiClient:BackendApiClient;
    constructor(){
        this.apiClient = new BackendApiClient(`${import.meta.env.VITE_BASE_URL}/vehicles`)
    };

    async fetchAllCars(page:number,limit:number):Promise<Car[]>{
        return this.apiClient.get<any>('',{
            params:{
                page,
                limit
            }
        });
    };

    async deleteCar(id:number):Promise<void>{
        return this.apiClient.delete<any>(`/${id}`)
    };

    async approveAd(id:number):Promise<void>{
        return this.apiClient.put<any,any>(`${id}/approveAd`,{})
    }
};

export default AdminServices