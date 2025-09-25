import UserDataService from '../services/UserDataServices';
import BookingServices from '../services/BookingServices';

import type { Booking } from '@/types/Bookings';
import React, { useEffect, useMemo, useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import type { UserAttributes } from '@/types/Users';
import { MdAutoDelete } from 'react-icons/md';

const bookingServices = new BookingServices();
const userServices = new UserDataService();

const Bookings = () => {
    const [search, setsearch] = useState('');
    const [loading, setloading] = useState(false);
    const [bookings, setbookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [userData, setuserData] = useState<UserAttributes[]>([])

    const fetchBookings = async () => {
        setloading(true);
        await bookingServices.fetchAllBookings()
            .then((res: Booking) => {
                setbookings(res as any);
                setFilteredBookings(res as any)
                setloading(false);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

                setloading(false);
            })

    };

    useEffect(() => {
        fetchBookings()
            .then(() => {
                return userServices.fetchOwnerData()
            })
            .then((res) => {
                setuserData(res)
            })
            .catch((err) => {
                console.error(err)
            });
    }, []);





    const sortedBookings = useMemo(() => {
        return [...filteredBookings].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [filteredBookings]);
    const userMap = useMemo(() => {
        const map: Record<number, UserAttributes> = {};
        userData.forEach((u) => {
            map[u.id] = u;
        });
        return map;
    }, [userData]);

    useEffect(() => {
    if (search.trim() === "") {
      setFilteredBookings(bookings);
      return;
    }

    const filtered = bookings.filter(
      (item) =>
        item.vehicle.model
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.vehicle.make
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredBookings(filtered);
  }, [search, bookings]);

 






    return (
        <div className="appointments">
            <h2 className="title">Bookings:</h2>

            <div className="search">
                <input value={search} onChange={(e) => setsearch(e.target.value)} type="search" placeholder="Search bookings..." />
                <CiSearch className="search-icon" />
            </div>



            <div className="table-container">
                {!loading && bookings.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                        <h1>No Bookings Available</h1>
                    </div>
                ) : (
                    <table className="appointment-table">
                        <thead>
                            <tr>
                                <th style={{ fontSize: 16 }}>#</th>
                                <th style={{ fontSize: 16 }}>Start Date</th>
                                <th style={{ fontSize: 16 }}>End Date</th>
                                <th style={{ fontSize: 16 }}>Vehicle</th>
                                <th style={{ fontSize: 16 }}>Owner</th>
                                <th style={{ fontSize: 16 }}>Customer</th>
                                <th style={{ fontSize: 16 }}>Approved</th>
                                <th style={{ fontSize: 16 }}>Rent</th>
                                <th style={{ fontSize: 16 }}>From</th>
                                <th style={{ fontSize: 16 }}>To</th>
                                <th style={{ fontSize: 16 }}>Booking Category</th>
                                <th style={{ fontSize: 16 }}>Owner contact</th>
                                <th style={{ fontSize: 16 }}>User contact</th>
                              


                            </tr>
                        </thead>
                        <tbody>
                            {sortedBookings?.map((bkng, i) => {
                                const owner = userMap[bkng.vehicle.ownerId];
                                const customer = userMap[bkng.userId];
                                return (
                                    <tr key={bkng.id}>
                                        <td style={{ fontSize: 15 }}>{i + 1}</td>
                                        <td style={{ fontSize: 15 }}>{new Date(bkng.startDate).toLocaleDateString()}</td>
                                        <td style={{ fontSize: 15 }}>{new Date(bkng.endDate).toLocaleDateString()}</td>
                                        <td style={{ fontSize: 15 }}>{bkng.vehicle.make} {bkng.vehicle.model}</td>
                                        <td style={{ fontSize: 15 }}>{owner?owner.name:''}</td>
                                        <td style={{ fontSize: 15 }}>{customer?customer.name:''}</td>
                                        <td style={{ fontSize: 15 }}>{bkng.isApproved ? 'Yes' : 'No'}</td>
                                        <td style={{ fontSize: 15 }}>Rs.{bkng.price}/-</td>
                                        <td style={{ fontSize: 15 }}>{bkng.pickupAddress}</td>
                                        <td style={{ fontSize: 15 }}>{bkng.dropoffAddress}</td>
                                        <td style={{ fontSize: 15 }}>{bkng.securityPersonel as number > 0 ? 'Protocol' : bkng.bookedForEvent ? 'Event' : 'Standard'}</td>
                                        <td style={{ fontSize: 15 }}>{owner?owner.phone:''}</td>
                                        <td style={{ fontSize: 15 }}>{customer?customer.phone:''}</td>
                                        





                                        {/* <td style={{ fontSize: 15 }}>{vehicle.licensePlateNumber}</td>
                    <td style={{ fontSize: 15 }}>{vehicle.owner?.name}</td>
                    <td style={{ fontSize: 15 }}>{vehicle.owner?.phone}</td>
                    <td style={{ fontSize: 15 }}>{vehicle.owner?.cnic}</td>
                    <td style={{ fontSize: 15 }}>{vehicle.dailyRent} PKR</td>
                    <td style={{ fontSize: 15 }}>{vehicle.city}</td>

                    <td style={{ fontSize: 15 }}>{CategoryDispatcher(vehicle)} <BiPencil onClick={() => {
                      setisCategory(true); setcurrentCateg(CategoryDispatcher(vehicle)); setselectedCar(vehicle)
                    }} style={{ cursor: 'pointer' }} /></td>

                    <td style={{ fontSize: 15 }}>{vehicle.vehicleType}  <BiPencil onClick={() => {
                      setisBodyType(true); setselectedCar(vehicle)
                    }} style={{ cursor: 'pointer' }} /></td>



                    <td style={{ fontSize: 15 }}>
                      <span onClick={() => openImageModal(vehicle.images)} className='view-images'>
                        View Images
                      </span>
                    </td>
                    <td>
                      <MdAutoDelete onClick={async () => {
                        try {
                          setactionReload(true)
                          await adminServices.deleteCar(vehicle.id);
                          localStorage.setItem('pages', JSON.stringify(pages));
                          await fetchCars()

                        } catch (error) {
                          setactionReload(false);
                        }
                        finally {
                          setactionReload(false)
                        }
                      }} className="delete-icon" />
                    </td>
                    <td style={{ cursor: 'pointer', fontSize: 15 }} onClick={async () => {
                      try {
                        setactionReload(true);
                        await adminServices.approveAd(vehicle.id);
                        localStorage.setItem('pages', JSON.stringify(pages));
                        await fetchCars()

                      } catch (error) {
                        setactionReload(false)

                      }
                      finally {
                        setactionReload(false)
                      }
                    }}>
                      {vehicle.isApproved ? 'DisApprove' : 'Approve'}
                    </td>
                    <td style={{ fontSize: 15 }}>{vehicle.owner?.credits}</td>
                    <td >
                      <MdAddBox

                        onClick={async () => {
                          try {

                            setaddCredits(true);
                            localStorage.setItem('pages', JSON.stringify(pages));
                            setuserId(vehicle.ownerId);
                            setcredits(vehicle.owner?.credits as number)
                          } catch (error) {

                          }

                        }}
                        className="add-icon" />
                    </td>  */}

                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>
                )}

            </div>





        </div>

    )
}

export default Bookings