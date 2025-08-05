import React, { useState } from 'react';
import './modal.scss';
import UserDataService from '../services/UserDataServices';

const userServices = new UserDataService();

const CreditModal = ({ show, onClose, id,creditsPass,fetchCars }: any) => {
    const userId = parseInt(id);
   
    const [credits, setcredits] = useState(0);
    const handleAddCredits = async (e: any) => {
        e.preventDefault();
        const creditsToAdd = creditsPass + credits;
        try {
            
           const response  =  await userServices.updateCredits(creditsToAdd, id)
           if(response){

               await fetchCars();
               onClose(!show)
           }
           
        } catch (error) {
            
        }
        

    }
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={() => onClose(!show)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => onClose(!show)}>
                    &times;
                </button>
                <div className="modal-content">
                    <form onSubmit={handleAddCredits} style={{ textAlign: 'center' }} action="">
                        <label style={{ fontSize: 26, fontWeight: 'bolder' }} htmlFor="">
                            Add Credits to wallet
                        </label>
                        <input onChange={(e) => setcredits(Number(e.target.value))} placeholder='0.00' style={{ width: '100%', padding: 5, marginTop: 10, height: '50px', fontSize: 20 }} type="number" min={0} />
                        <button type='submit' style={{ padding: 7, width: '100%', backgroundColor: '#FFD200', marginTop: 10, fontSize: '16px', color: 'white', borderRadius: 10, cursor: 'pointer' }}>
                            Add Credits
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default CreditModal;
