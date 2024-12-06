
export interface User {
    name: string;
    email: string;
    phone: string;
    password: string; // Typically, password fields shouldn't be handled directly in the front end for security reasons.
    confirmPassword: string;
    }
