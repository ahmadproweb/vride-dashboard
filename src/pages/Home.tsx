import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CiBookmarkCheck, CiSearch } from 'react-icons/ci';
import { MdAutoDelete } from 'react-icons/md';
import AdminServices from '../services/AdminServices';
import type { Car } from '@/types/Vehicles';

const adminServices = new AdminServices();

const Home = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasMoreData, sethasMoreData] = useState(true);
  const [search, setsearch] = useState('')
  const [modalImages, setModalImages] = useState([]);
  const [vehicles, setvehicles] = useState<Car[] | []>([]);
  const [loading, setloading] = useState(false);
  const [pages, setpages] = useState(1);
  const limit = 10;

  useEffect(()=>{
    fetchCars();
    
  },[pages]);
  
  const fetchCars = async()=>{
    try {
      setloading(true)
       await adminServices.fetchAllCars(pages,limit)
      .then((res)=>{
        setloading(false);
        if(res.length<limit){
          sethasMoreData(false);
        }
        setvehicles((prev)=>[...prev,...res].filter((v, i, arr)=>arr.findIndex(t => t.id === v.id) === i))

      })
      .catch((error:any)=>{
        setloading(false);
        console.error(error)
      })
    } catch (error:any) {
      setloading(false);
    }
  }

  const openImageModal = (images:any) => {
   
    setModalImages(images);
    setActiveImageIndex(0);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === modalImages.length - 1 ? 0 : prev + 1));
  };
   
    
    

  

  

  return (
    <>
    
    <div className="appointments">
      <h2 className="title">Vehicles:</h2>

      <div className="search">
        <input type="search" placeholder="Search vehicles..." />
        <CiSearch className="search-icon" />
      </div>

      <div className="table-container">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Vehicle #Id</th>
              <th>Rent/Day</th>
              <th>City</th>
              <th>Images</th>
              <th>Delete</th>
              <th>Approve</th>

            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, i) => (
              <tr key={vehicle.id}>
                <td>{i + 1}</td>
                <td>{vehicle.make} {vehicle.model}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.id}</td>
                <td>{vehicle.dailyRent} PKR</td>
                <td>{vehicle.city}</td>
                <td>
                  <span onClick={() => openImageModal(vehicle.images)} className='view-images'>
                    View Images
                  </span>
                </td>
                <td>
                <MdAutoDelete onClick={()=>{
                  adminServices.deleteCar(vehicle.id);
                  window.location.reload();
                }} className="delete-icon"/>
                </td>
                <td style={{cursor:'pointer'}} onClick={()=>{
                  adminServices.approveAd(vehicle.id);
                  window.location.reload();
                }}>
                {vehicle.isApproved?'DisApprove':'Approve'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {modalOpen && (
  <div className="appointments__modal-overlay" onClick={closeImageModal}>
    <div className="appointments__modal-content" onClick={(e) => e.stopPropagation()}>
      <img
        src={modalImages[activeImageIndex]}
        alt="carousel"
        className="appointments__modal-image"
      />
      <div className="appointments__modal-controls">
        <button onClick={prevImage}>
          <FaChevronLeft />
        </button>
        <span>{activeImageIndex + 1} / {modalImages.length}</span>
        <button onClick={nextImage}>
          <FaChevronRight />
        </button>
      </div>
      <button onClick={closeImageModal} className="appointments__modal-close">✕</button>
    </div>
  </div>
)}
  <div style={{padding:10,display:'flex',flexDirection:'row',gap:20}}>
    <button disabled={!hasMoreData} onClick={()=>setpages(pages+1)} style={{padding:10,backgroundColor:'#FFD200',borderRadius:'20px',cursor:'pointer'}}>
      {loading?<div className='loader'></div>:'Load More'}
    </button>
  </div>

    </div>
    
    </>
  );
};

export default Home;
