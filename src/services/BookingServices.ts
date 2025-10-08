import BackendApiClient from "./BackendAPIClient";



class BookingServices {
    private apiClient: BackendApiClient;
    constructor() {
        this.apiClient = new BackendApiClient(`https://api.vriderental.com/api/v1/bookings`)
    };

  
    async fetchAllBookings(): Promise<any> {
              

                return this.apiClient.get<any>('', {});
        }
     



};

export default BookingServices