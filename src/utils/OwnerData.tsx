import type { Car } from "@/types/Vehicles";
import UserDataService from "../services/UserDataServices";
import type { UserAttributes } from "@/types/Users";

const userServices = new UserDataService();

export const updateData=async(data:Car[])=>{
    console.log(data[0].isApproved,'')
   
    const users:UserAttributes[] = await userServices.fetchOwnerData();
    const userMap = new Map(users.map(user=>[user.id,user]));

    return data.filter(vehicle=>{
        const ownerId = vehicle.ownerId;
        return ownerId && !isNaN(ownerId) && userMap.has(ownerId);
    })
    .map(vehicle=>{
        const user = userMap.get(vehicle.ownerId);
        return {
            ...vehicle,
            owner:{
                id:user?.id,
                name:user?.name,
                cnic:user?.cnic,
                number:user?.phone
            }
        }
    })
    
    
    

}

