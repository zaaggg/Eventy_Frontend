export interface AccountConnected {
    _id:string;
    name: string;
    email: string;
    password?: string; // Password is optional for API responses (excluding registration)
    phone: string;
    address?: string;
    gender?: string;
        profileImage: string;
    hasVerifiedEmail: boolean;
        userRole: "user" | "admin";
        centerOfInterest: string[]; // This can be a list of CenterOfInterest IDs
        organizedEvents: string[]; // List of event IDs
        participatedEvents: string[]; // List of participation event IDs
        createdAt: string; // Timestamp field
        updatedAt: string; // Timestamp field
    }
