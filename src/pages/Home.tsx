import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { MdAddBox, MdAutoDelete } from 'react-icons/md';
import AdminServices from '../services/AdminServices';
import type { Car } from '@/types/Vehicles';
import { updateData } from '../utils/OwnerData';
import CreditModal from '../Components/CreditModal';

const adminServices = new AdminServices();

const Home = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [addCredits, setaddCredits] = useState(false);
  const [hasMoreData, sethasMoreData] = useState(true);
  const [search, setsearch] = useState('')
  const [allVehicles, setAllVehicles] = useState<Car[]>([]);
  const [modalImages, setModalImages] = useState([]);
  const [vehicles, setvehicles] = useState<Car[] | []>([]);
  const [loading, setloading] = useState(false);
  const [pages, setpages] = useState(1);
  const [userId, setuserId] = useState(0);
  const [credits, setcredits] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchCars();

  }, [pages]);



  const fetchCars = async () => {
    try {
      setloading(true)
      await adminServices.fetchAllCars(pages, limit)
        .then((res) => {
          return updateData(res)
            .then((res) => {

              setloading(false);
              if (res.length < limit) {
                sethasMoreData(false);
              }
              const combine: any = [...allVehicles, ...res].filter((v, i, arr) => arr.findIndex(t => t.id === v.id) === i);
              setvehicles(combine);
              setAllVehicles(combine);
            })


        })
        .catch((error: any) => {
          setloading(false);
          console.error(error)
        })
    } catch (error: any) {
      setloading(false);
    }
  }

  const openImageModal = (images: any) => {

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


  const handleSearch = (search: any) => {

    if (search.trim() === "") {
      setvehicles(allVehicles);
      return;
    };

    const filtered = allVehicles.filter((item) =>
      item.model.toLowerCase().includes(search.toLowerCase()) ||
      item.make.toLowerCase().includes(search.toLowerCase()) ||
      item.licensePlateNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.owner?.name.toLowerCase().includes(search.toLowerCase())
    );

    setvehicles(filtered);


  };

  useEffect(() => {
    handleSearch(search)

  }, [search])

  return (
    <>

      <div className="appointments">
        <h2 className="title">Vehicles:</h2>

        <div className="search">
          <input value={search} onChange={(e) => setsearch(e.target.value)} type="search" placeholder="Search vehicles..." />
          <CiSearch className="search-icon" />
        </div>

        <div className="table-container">
          {!loading && vehicles.length === 0 ? (
            <div style={{textAlign:'center'}}>
              <h1>No Vehicles Available</h1>
            </div>
          ) : (
            <table className="appointment-table">
              <thead>
                <tr>
                  <th style={{ fontSize: 16 }}>#</th>
                  <th style={{ fontSize: 16 }}>Vehicle</th>
                  <th style={{ fontSize: 16 }}>Registeration No.</th>
                  <th style={{ fontSize: 16 }}>Owner</th>
                  <th style={{ fontSize: 16 }}>Rent/Day</th>
                  <th style={{ fontSize: 16 }}>City</th>
                  <th style={{ fontSize: 16 }}>Images</th>
                  <th style={{ fontSize: 16 }}>Delete</th>
                  <th style={{ fontSize: 16 }}>Approve</th>
                  <th style={{ fontSize: 16 }}>Credits</th>
                  <th style={{ fontSize: 16 }}>Add Credits</th>


                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle, i) => (
                  <tr key={vehicle.id}>
                    <td style={{ fontSize: 15 }}>{i + 1}</td>
                    <td style={{ fontSize: 15 }}>{vehicle.make} {vehicle.model}</td>
                    <td style={{ fontSize: 15 }}>{vehicle.licensePlateNumber}</td>
                    <td style={{ fontSize: 15 }}>{vehicle.owner?.name}</td>
                    <td style={{ fontSize: 15 }}>{vehicle.dailyRent} PKR</td>
                    <td style={{ fontSize: 15 }}>{vehicle.city}</td>
                    <td style={{ fontSize: 15 }}>
                      <span onClick={() => openImageModal(vehicle.images)} className='view-images'>
                        View Images
                      </span>
                    </td>
                    <td>
                      <MdAutoDelete onClick={() => {
                        adminServices.deleteCar(vehicle.id);
                        window.location.reload();
                      }} className="delete-icon" />
                    </td>
                    <td style={{ cursor: 'pointer', fontSize: 15 }} onClick={() => {
                      adminServices.approveAd(vehicle.id);
                      window.location.reload();
                    }}>
                      {vehicle.isApproved ? 'DisApprove' : 'Approve'}
                    </td>
                    <td style={{ fontSize: 15 }}>{vehicle.owner?.credits}</td>
                     <td onClick={()=>{
                      setaddCredits(true);
                      setuserId(vehicle.ownerId);
                      setcredits(vehicle.owner?.credits as number)
                     }}>
                      <MdAddBox onClick={() => {
                       
                      }} className="add-icon" />
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}

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
        <CreditModal show={addCredits} onClose={setaddCredits} id={userId} creditsPass={credits} />
        <div style={{ padding: 10, display: 'flex', flexDirection: 'row', gap: 20 }}>
          <button disabled={!hasMoreData} onClick={() => setpages(pages + 1)} style={{ padding: 10, backgroundColor: '#FFD200', borderRadius: '20px', cursor: 'pointer' }}>
            {loading ? <div className='loader'></div> : 'Load More'}
          </button>
        </div>

      </div>

    </>
  );
};

export default Home;
