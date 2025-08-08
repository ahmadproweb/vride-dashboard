export type Car = {
        id: number; 
        address: string;
        vehicleType: string; 
        make: string; 
        model: string; 
        color: string; 
        city: string; 
        description: string; 
        dailyRent: number; 
        rentPer6Hrs: number;
        rentPer12Hrs: number;
        rentalType: 'inter-city' | 'intra-city';
        minRentalPeriod: number; 
        maxRentalPeriod: number; 
        seatingCapacity: number; 
        engineCapacity: number; 
        mileage: number; 
        fuelType: string; 
        transmissionType: string; 
        licensePlateNumber: string; 
        cancellationPolicy: string; 
        isAvailable: number;
        images: string[]; 
        ownerId: number;
        securityDeposit: number; 
        withDriver: boolean; 
        withoutDriver: boolean; 
        weddingBooking: boolean;
        createdAt: string; 
        updatedAt: string; 
        owner?: {
                id: number;
                name: string;
                phone: string;
                email: string;
                credits?:number;
                cnic?:string
        }
        rating: number | null;
        isListed?:boolean;
        isApproved?:boolean;
};