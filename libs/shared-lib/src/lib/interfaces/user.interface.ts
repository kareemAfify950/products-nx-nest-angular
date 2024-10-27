export interface User {
    email: string;
    password: string; // Store hashed passwords
    _id?: string;
}
