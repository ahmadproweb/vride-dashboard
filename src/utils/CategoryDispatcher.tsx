import type { Car } from '@/types/Vehicles';




let category = '';

// const [category, setcategory] = useState<'luxury'|'protocol'|'rentalcomp' | 'featured'>('featured');

export const CategoryDispatcher = (item: Car) => {

    if (item.weddingBooking) {
        return category = 'Luxury'
    }
    else if (item.owner?.userType === 'admin' && item.weddingBooking) {
        return category = 'Company (Luxury)'
    }
    else if (item.owner?.userType === 'admin' && item.isBulletProof || item.securityDetails !== null) {
        return category = 'Company (Protocol)'
    }
    else if (item.isBulletProof || item.securityDetails !== null) {
        return category = 'Protocol'
    }
    else {
        return category = 'Featured'
    }


}

