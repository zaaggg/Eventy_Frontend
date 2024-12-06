export interface CreateEvent {
    title: string;
    description: string;
    dateTime: {
      dates: Date[]; // Array of Date objects
      times: string[]; // Array of strings for time
    };
    createdBy: string; // User ID (should be ObjectId in MongoDB)
    eventProfile: string; // URL or path to the event profile image
    location: string;
    maxParticipants: number;
    categories: string[]; // Array of Category ObjectIds (as strings)
    centerOfInterest: string[]; // Array of CenterOfInterest ObjectIds (as strings)
    price: number;
    
}