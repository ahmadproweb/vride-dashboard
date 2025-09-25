import BackendApiClient from "./BackendAPIClient";



class BookingServices {
    private apiClient: BackendApiClient;
    constructor() {
        this.apiClient = new BackendApiClient(`${import.meta.env.VITE_BASE_URL}/bookings`)
    };

  
    async fetchAllBookings(): Promise<any> {
              

                return this.apiClient.get<any>('', {});
        }
     



};

export default BookingServices