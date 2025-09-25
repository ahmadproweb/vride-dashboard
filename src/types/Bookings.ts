export type Booking = {
        id: number;
        userId: number;
        vehicleId: number;
        price: number;
        startDate: string;
        endDate: string;
        createdAt: string;
        updatedAt: string;
        pickupAddress?: string;
        pickupLat?: number;
        pickupLng?: number;
        dropoffAddress?: string;
        dropoffLat?: number;
        dropoffLng?: number;
        ownerEmail: string;
        userEmail:string;
        bookedForEvent?: boolean;
        status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
        isApproved:boolean;
        securityPersonel?:number;
        vehicle: {
                id: number;
                make: string;
                model: string;
                color: string;
                img: string;
                isAvailable: boolean;
                withDriver: boolean;
                ownerId: number;
                rating: number | null;
                createdAt: string;
                updatedAt: string;
                
        };
};