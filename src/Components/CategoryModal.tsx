import AdminServices from '../services/AdminServices';
import './modal.scss';
import type { Car } from '@/types/Vehicles';
import UserDataService from '../services/UserDataServices';
import type { UserAttributes } from '@/types/Users';

const adminServices = new AdminServices();
const userService = new UserDataService();


const CategoryModal = ({ show, onClose, category, selectedCar, fetchCars }: {
    show: boolean;
    onClose: (val: boolean) => void;
    category: string;
    selectedCar?: Car;
    fetchCars:any;
}) => {

    console.log(selectedCar,'');
    
    

    if (!show) return null;

    const changeCategory = async (cat: string) => {
        console.log(cat,'');
        
        const ct = cat.trim();
        const catg = category.trim();

        if (ct === "Featured" && catg === "Luxury") {
            const carData: Partial<Car> = {
                weddingBooking: false
            }
            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show);



        }
        else if (ct === "Featured" && catg === "Rental") {

            const userData: Partial<UserAttributes> = {
                userType: 'user'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);
            await fetchCars();
            onClose(!show);


        }
        else if (ct === "Featured" && catg === "Protocol") {

            const carData: Partial<Car> = {
                isBulletProof: false,
                securityDetails: null as any
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)

        }

        else if (ct === "Featured" && catg === "Company (Luxury)") {

            const userData: Partial<UserAttributes> = {
                userType: 'user'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);


            const carData: Partial<Car> = {
                weddingBooking: false
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)

        }

        else if (ct === "Featured" && catg === "Company (Protocol)") {

            const userData: Partial<UserAttributes> = {
                userType: 'user'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);


            const carData: Partial<Car> = {
                isBulletProof: false,
                securityDetails: null as any
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)



        }
        else if (ct === "Luxury" && catg === "Featured") {

            const carData: Partial<Car> = {
                weddingBooking: true
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)

        }
        else if (ct === "Luxury" && catg === "Rental") {
            const userData: Partial<UserAttributes> = {
                userType: 'admin'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);

            const carData: Partial<Car> = {
                weddingBooking: true
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)

        }
        else if (ct === "Luxury" && catg === "Protocol") {
            const carData: Partial<Car> = {
                weddingBooking: true,
                isBulletProof: false,
                securityDetails: null as any

            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)

        }

        else if (ct === "Luxury" && catg === "Company (Luxury)") {

            const userData: Partial<UserAttributes> = {
                userType: 'user'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);
            await fetchCars();
            onClose(!show);

        }

        else if (ct === "Luxury" && catg === "Company (Protocol)") {
            const userData: Partial<UserAttributes> = {
                userType: 'user'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);
            const carData: Partial<Car> = {
                weddingBooking: true,
                isBulletProof: false,
                securityDetails: null as any

            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show);

        }
        else if (ct === "Protocol" && catg === "Featured") {
            const carData: Partial<Car> = {
                isBulletProof: true
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)


        }
        else if (ct === "Protocol" && catg === "Luxury") {
            const carData: Partial<Car> = {
                weddingBooking: false,
                isBulletProof: true
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)


        }
        else if (ct === "Protocol" && catg === "Rental") {
            const userData: Partial<UserAttributes> = {
                userType: 'user'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);
            const carData: Partial<Car> = {
                isBulletProof: true
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)

        }


        else if (ct === "Protocol" && catg === "Company (Luxury)") {
            const userData: Partial<UserAttributes> = {
                userType: 'user'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);
            const carData: Partial<Car> = {
                weddingBooking: false,
                isBulletProof: true
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)

        }

        else if (ct === "Protocol" && catg === "Company (Protocol)") {
            const userData: Partial<UserAttributes> = {
                userType: 'user'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);
            await fetchCars();
            onClose(!show)


        }
        else if (ct === "Rental" && catg === "Featured") {
            const userData: Partial<UserAttributes> = {
                userType: 'admin'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);
            await fetchCars();
            onClose(!show)

        }
        else if (ct === "Rental" && catg === "Protocol") {
            const carData: Partial<Car> = {
                isBulletProof: false,
                securityDetails: null as any
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            const userData: Partial<UserAttributes> = {
                userType: 'admin'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);
            await fetchCars();
            onClose(!show)
        }
        else if (ct === "Rental" && catg === "Luxury") {
            const carData: Partial<Car> = {
                isBulletProof: false,
            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            const userData: Partial<UserAttributes> = {
                userType: 'admin'
            }

            await userService.updateUser(userData, selectedCar?.ownerId || 0);
            await fetchCars();
            onClose(!show)
        }

        else if (ct === "Rental" && catg === "Company (Luxury)") {

            const carData: Partial<Car> = {
                weddingBooking: false,

            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)

        }

        else if (ct === "Rental" && catg === "Company (Protocol)") {

            const carData: Partial<Car> = {
                isBulletProof: false,
                securityDetails: null as any

            }

            await adminServices.updateCar(selectedCar?.id || 0, carData);
            await fetchCars();
            onClose(!show)

        }

        else {
            onClose(!show);
            return
        }





    }





    return (
        <div className="modal-overlay" onClick={() => onClose(!show)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => onClose(!show)}>
                    &times;
                </button>
                <div className="modal-content">
                    <h1 style={{ textAlign: 'center' }}>Change the Category</h1>
                    <div onClick={() => changeCategory('Featured')} style={{ borderBottom: '1px solid grey', padding: 3, fontSize: 22, cursor: 'pointer', marginTop: 5 }}>
                        <p>
                            Featured
                        </p>
                    </div>
                    <div onClick={() => changeCategory('Luxury')} style={{ borderBottom: '1px solid grey', padding: 3, fontSize: 22, cursor: 'pointer', marginTop: 5 }}>
                        <p>
                            Luxury
                        </p>
                    </div>
                    <div onClick={() => changeCategory('Rental')} style={{ borderBottom: '1px solid grey', padding: 3, fontSize: 22, cursor: 'pointer', marginTop: 5 }}>
                        Rental
                    </div>
                    <div onClick={() => changeCategory('Protocol')} style={{ borderBottom: '1px solid grey', padding: 3, fontSize: 22, cursor: 'pointer', marginTop: 5 }}>
                        Protocol
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
