export interface Eventt {
  dateTime: {
    dates: string[]; // ISO string dates
    times: string[]; // Times in string format
  };
  notifications: {
      reminders: boolean;
      updates: boolean;
  };
  _id: string; // Unique identifier for the event
  title: string; // Event title
  description: string; // Event description
  createdBy: string; // ID of the creator
  eventProfile: string; // URL of the event's profile image
  location: string; // Event location
  maxParticipants: number; // Maximum number of participants
  categories: string[]; // List of category IDs
  centerOfInterest: string[]; // List of center of interest IDs
  price: number; // Price of the event
  currency: string; // Currency code
  status: string; // Status of the event (e.g., 'upcoming')
  participants: string[]; // List of participant IDs
// Version key (from MongoDB)
}
