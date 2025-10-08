import type { UserAttributes } from "../types/Users";
import BackendApiClient from "./BackendAPIClient";

class UserDataService{
    private apiClient:BackendApiClient;
    constructor(){
        this.apiClient = new BackendApiClient(`https://api.vriderental.com/api/v1/users`)
    };

    async fetchOwnerData():Promise<any>{
        return this.apiClient.get<any>('')
    };

    async updateCredits(credits:number,id:number):Promise<any>{
        
        return this.apiClient.put<any,any>(`${id}/credits`,{credits})
        
    };

     async updateUser(
                user: Partial<UserAttributes>,
                userId: number
        ): Promise<any> {
            console.log(userId,'');
            

            const payload = Object.fromEntries(
                Object.entries(user).filter(([_,value])=>value!==undefined && value!=="")
            ) as Partial<UserAttributes>

            return this.apiClient.put<Partial<UserAttributes>,any>(
                `/${userId}/adminUser`,payload,
                
            )
                


        }
         async fetchUser(userId: number): Promise<any> {
                return this.apiClient.get<any>(`/${userId}`);
        }
};

export default UserDataService;