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
  selector: 'app-my-partitipations',
  templateUrl: './my-partitipations.page.html',
  styleUrls: ['./my-partitipations.page.scss'],
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
export class MyPartitipationsPage implements OnInit {
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
    this.eventS.getPartitipatedEvents().subscribe({
      next: (events) => {
        this.eventList = events;
        this.eventS.participatedEvents = events;
        console.log('Fetched events:', this.eventList);

        // Get the user ID of the logged-in user (make sure it's available)

      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
  }
}
