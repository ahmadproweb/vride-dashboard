import type { Car } from '@/types/Vehicles';




let category = '';

// const [category, setcategory] = useState<'luxury'|'protocol'|'rentalcomp' | 'featured'>('featured');

export const CategoryDispatcher = (item: Car): string => {
  if (!item) return 'Unknown';

  if (item.owner?.userType === 'admin' && item.weddingBooking)
    return 'Company (Luxury)';
  if (item.weddingBooking)
    return 'Luxury';
  if (item.owner?.userType === 'admin' && (item.isBulletProof || item.securityDetails != null))
    return 'Company (Protocol)';
  if (item.isBulletProof || item.securityDetails != null)
    return 'Protocol';
  if(item.owner?.userType==="admin"){
    return 'Company';
  }
  return 'Featured';
};


