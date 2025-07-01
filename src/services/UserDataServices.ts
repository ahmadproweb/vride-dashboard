import BackendApiClient from "./BackendAPIClient";

class UserDataService{
    private apiClient:BackendApiClient;
    constructor(){
        this.apiClient = new BackendApiClient(`${import.meta.env.VITE_BASE_URL}/users`)
    };

    async fetchOwnerData():Promise<any>{
        return this.apiClient.get<any>('')
    }
};

export default UserDataService;