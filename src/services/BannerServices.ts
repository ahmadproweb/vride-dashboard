import type { Banner } from "@/types/banner";
import BackendApiClient from "./BackendAPIClient";

export class BannerServices{
    private apiClient: BackendApiClient;

    constructor(){
        this.apiClient = new BackendApiClient(`https://api.vriderental.com/api/v1/banners`);
    };

    async uploadBanner(bnrData:Partial<Banner>):Promise<any>{
        const formData = new FormData();

        formData.append('title',bnrData.title || '');
        formData.append('link',bnrData.link || '');
        formData.append('status',String(bnrData.status));

        if(bnrData.bnrImg){
            formData.append('bnrImg',bnrData.bnrImg)
        };

        return this.apiClient.post<FormData,any>('/',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    };

    async updateBanner(bnrData:Partial<Banner>,id:number):Promise<any>{
        const formData = new FormData();

        Object.entries(bnrData).forEach(([key,value])=>{
            if(value!==undefined && value!==null){
                if(typeof value === 'boolean'){
                    formData.append(key,String(value))
                }
                else{
                    formData.append(key,value as any)
                }
            }
        });

        return this.apiClient.put(`/${id}`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })

    };

    async fetchBanners():Promise<any>{
        return this.apiClient.get('/')
    };

    async fetchAdminBanners(): Promise<any> {
        return this.apiClient.get('/adminBnr')
    };

    async deleteBanner(id:number):Promise<any>{
        return this.apiClient.delete(`/${id}`);

    }




}