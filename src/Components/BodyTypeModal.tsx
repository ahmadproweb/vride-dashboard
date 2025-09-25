import AdminServices from '../services/AdminServices';
import './modal.scss';
import type { Car } from '@/types/Vehicles';
import UserDataService from '../services/UserDataServices';

import { carTypes } from '../data/carTypes';

const adminServices = new AdminServices();



const BodyTypeModal = ({ show, onClose, selectedCar, fetchCars }: {
    show: boolean;
    onClose: (val: boolean) => void;
    selectedCar?: Car;
    fetchCars: any;
}) => {


    if (!show) return null;

    const changeType=async(type:string)=>{
        if(selectedCar?.vehicleType === type){
            onClose(!show);
            return;
        }
        else{
            const carData:Partial<Car>={
                vehicleType:type
            };
            await adminServices.updateCar(selectedCar?.id || 0,carData)
            .then((res)=>{
                if(res.message){
                    onClose(!show);
                    fetchCars();
                    return
                }
            })
            .catch((err)=>{
                console.error(err);
                onClose(!show);
                return;
            })
        }

    }



    return (
        <div className="modal-overlay" onClick={() => onClose(!show)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => onClose(!show)}>
                    &times;
                </button>
                <div className="modal-content">
                    <h1 style={{ textAlign: 'center' }}>Change the Vehicle Type</h1>
                    {carTypes.map((item, index) => {
                        return (
                            <>
                                <div onClick={()=>changeType(item.value)} style={{ borderBottom: '1px solid grey', padding: 3, fontSize: 22, cursor: 'pointer', marginTop: 5 }}>
                                    <p>
                                        {item.label}
                                    </p>
                                </div>
                            </>
                        )
                    })}
                  

                </div>
            </div>
        </div>
    );
};

export default BodyTypeModal;
