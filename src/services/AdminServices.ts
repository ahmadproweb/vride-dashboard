import type { Car } from "@/types/Vehicles";
import BackendApiClient from "./BackendAPIClient";



class AdminServices {
    private apiClient: BackendApiClient;
    constructor() {
        this.apiClient = new BackendApiClient(`${import.meta.env.VITE_BASE_URL}/vehicles`)
    };

    async fetchAllCars(page: number, limit: number): Promise<Car[]> {
        return this.apiClient.get<any>('/adminAll', {
            params: {
                page,
                limit
            }
        });
    };

    async deleteCar(id: number): Promise<void> {
        return this.apiClient.delete<any>(`/${id}`)
    };

    async approveAd(id: number): Promise<void> {

        return this.apiClient.put<any, any>(`/${id}/approveAd`, {})
    };



    async updateCar(carId: number, carData: Partial<Car>): Promise<any> {

        const payload = Object.fromEntries(
            Object.entries(carData).filter(([_, values]) => values !== undefined && values !== "")
        ) as Partial<Car>;

        return this.apiClient.put<Partial<Car>, any>(
            `${carId}/adminVehicle`, payload
        )



    }
     



};

export default AdminServices