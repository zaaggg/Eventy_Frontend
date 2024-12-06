import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonFabButton,
  IonBadge,
  IonRow,
  IonCol,
  IonSearchbar,
  IonicSlides,
  IonListHeader,
  IonList,
  IonCard,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  locateOutline,
  locationOutline,
  notificationsOutline,
  optionsOutline, addCircleOutline, logOutOutline } from 'ionicons/icons';
import { Category } from '../interfaces/category.interface';
import { Event } from '../interfaces/event.interface';
import { events } from '../data/events';
import { categories } from '../data/categories';
import { Eventt } from '../models/event.model';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonList,
    IonListHeader,
    IonSearchbar,
    IonCol,
    IonRow,

    IonFabButton,
    IonText,
    IonIcon,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonContent,
    RouterLink,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  upcomingEvents: Event[] = [];
  currentEvents: Event[] = [];
  categories: Category[] = [];
  eventList: Eventt[] = [];
  reqEventList: Eventt[] = [];
    a: string| null = "aaa"

  constructor(    private eventS: EventService , public userS: UserService, private router: Router,) {

    addIcons({locateOutline,addCircleOutline,logOutOutline,optionsOutline,locationOutline,arrowForwardOutline,notificationsOutline});
  }

  ngOnInit(): void {
    this.getEvents();
    this.currentEvents = [...events];
    console.log('current', this.currentEvents);
    this.upcomingEvents = events.sort((a, b) => {
      // Convert id to number for comparison
      const idA = parseInt(a.id, 10);
      const idB = parseInt(b.id, 10);
      return idB - idA; // Descending order
    });
    console.log(this.upcomingEvents);
    this.categories = [...categories];
    console.log(this.categories);
  }
  getEvents() {
    this.eventS.getAllEvents().subscribe({
      next: (events) => {
        // Filter events where the createdBy matches userConnectedId
         
        this.eventList = events.filter(event => event.createdBy !== this.userS.userConnected?._id);
        console.log(this.userS.userConnected?._id);
        // Optionally, update eventS.allEvents if needed
        this.eventS.allEvents = this.eventList;
  
        console.log('Fetched and filtered events:', this.eventList);
        //this.a = this.userS.getUserIdFromToken();
        console.log("a ============"+ this.a)
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      },
    });
    this.eventS.getRequestedEvents().subscribe({
      next: (events) => {
        this.reqEventList = events;
        this.eventS.requestedEvents = events;
        console.log('Fetched rrrevents:', this.reqEventList);

        // Get the user ID of the logged-in user (make sure it's available)

      },
      error: (err) => {
        console.error('Error fetching rrrevents:', err);
      },
    });
  }
  logout() {
    
      localStorage.removeItem('token');
      // Or sessionStorage.removeItem('token') if you're using sessionStorage
      this.router.navigate(['/login']);
  }
}
