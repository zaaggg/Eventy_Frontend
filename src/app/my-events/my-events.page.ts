import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonFabButton,
  IonCard,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  locateOutline,
  locationOutline,
  notificationsOutline,
  optionsOutline, qrCodeOutline, addCircleOutline, 
  addCircle
} from 'ionicons/icons';

import { Eventt } from '../models/event.model';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { IonButtons } from '@ionic/angular';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonFabButton,
    IonIcon,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonContent,
    RouterLink,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MyEventsPage implements OnInit {
  eventList: Eventt[] = [];
  myEventsList: Eventt[] = [];

  constructor(private eventS: EventService, private userS: UserService) {
    addIcons({ 
      qrCodeOutline, 
      addCircleOutline, 
      addCircle, 
      arrowForwardOutline,
      locateOutline, 
      notificationsOutline, 
      optionsOutline, 
      locationOutline
    });
  }

  ngOnInit() {
    this.getEvents();
  }

  ionViewWillEnter() {
    // Fetch events whenever the page is re-entered
    this.getEvents();
  }

  getEvents() {
    this.eventS.getAllEvents().subscribe({
      next: (events) => {
        this.eventList = events;
        this.eventS.allEvents = events;
        console.log('Fetched events:', this.eventList);

        // Get the user ID of the logged-in user (make sure it's available)
        const userConnectedId = this.userS.userConnected?._id;
        console.log('Logged-in user ID:', userConnectedId);

        if (userConnectedId) {
          // Filter the events where createdBy matches the logged-in user's ID
          this.myEventsList = this.eventList.filter(event => event.createdBy === userConnectedId);
          console.log('Filtered events for the logged-in user:', this.myEventsList);
        } else {
          console.log('No logged-in user found');
        }
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }
}
