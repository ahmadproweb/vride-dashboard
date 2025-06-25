import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { MdAutoDelete } from 'react-icons/md';

const dummyVehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    color: 'White',
    dailyRent: 5000,
    vehicleType: 'Sedan',
    fuelType: 'Petrol',
    transmissionType: 'Automatic',
    images: [
      'https://imageio.forbes.com/specials-images/imageserve/5d3703e2f1176b00089761a6/2020-Chevrolet-Corvette-Stingray/0x0.jpg?crop=4560,2565,x836,y799,safe&height=399&width=711&fit=bounds',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyHeIluJlieyZ0dCwRipoNIaeJuEufTcQMw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNnim_zaw2WVOgAeC2s-kF0Zyl4pAvPoQeK9oUq_Yy0VBlRGYZdY2pMKd0ocYkydFfCYs&usqp=CAU',
      'https://media.architecturaldigest.com/photos/66a914f1a958d12e0cc94a8e/16:9/w_2992,h_1683,c_limit/DSC_5903.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJro0A1CWbPg_negbklIsCGvncchxIOLTlQA&s',
    ],
    city: 'Lahore',
    address: 'Model Town',
  },
];

const Home = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  const openImageModal = (images) => {
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
              <th>Fuel</th>
              <th>Rent/Day</th>
              <th>City</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyVehicles.map((vehicle, i) => (
              <tr key={vehicle.id}>
                <td>{i + 1}</td>
                <td>{vehicle.make} {vehicle.model}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.fuelType}</td>
                <td>{vehicle.dailyRent} PKR</td>
                <td>{vehicle.city}</td>
                <td>
                  <span onClick={() => openImageModal(vehicle.images)} className='view-images'>
                    View Images
                  </span>
                </td>
                <td>
                <MdAutoDelete className="delete-icon"/>
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

    </div>
  );
};

export default Home;
