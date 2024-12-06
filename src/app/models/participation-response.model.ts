import { AccountConnected } from "./account-connected.model";

export interface ParticipationResponse {
    _id: string;
    status: string;
    requestDate: string;
    updatedAt: string;
    event: {
      _id: string;
      title: string;
      location: string;
      description: string;
      dateTime: { dates: string[]; times: string[] };
      currency: string;
    };
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      profileImage: string;
    }; // This is the array of requests
  }