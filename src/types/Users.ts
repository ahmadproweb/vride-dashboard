export type UserAttributes= {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    userType: 'user' | 'admin';
    profileImg?: string; // Optional profile image field
    cnic:string;
}