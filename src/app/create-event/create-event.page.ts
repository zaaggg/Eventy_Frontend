import { EventService } from '../services/event.service';
import { CategoryService } from '../services/category.service';
import { CenterService } from '../services/center.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../models/category.model';
import { Center } from '../models/center.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
  standalone: true,
  imports: [
    RouterModule, // RouterModule for navigation
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateEventPage implements OnInit {
  title: string = '';
  description: string = '';
  dateTimeInput: string = ''; // Combined date and time input
  date: string = ''; // Processed date string
  time: string = ''; // Processed time string
  //createdBy: string = '6741c7b53a3bb3a2eff1c5cc'; // Example user ID (replace with dynamic ID if needed)
  location: string = '';
  maxParticipants: string = '';
  price: string = '';
  currency: string = '';
  categories: string = ''; // Array to store selected categories
  centerOfInterest: string[] = []; // Array to store selected centers of interest
  eventProfile: File | null = null; // For uploaded image
  categoryList: Category[] = []; // List of categories fetched from the backend
  centerList: Center[] = [];
  a: string| null = "aaa" // List of centers of interest fetched from the backend

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private eventS: EventService,
    private categoryService: CategoryService,
    private centerService: CenterService,
    private router: Router,
    private userS: UserService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getCenters();
  }

  // Fetch categories from the backend
  getCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categoryList = categories;
        console.log('Fetched categories:', this.categoryList);

      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  // Fetch centers of interest from the backend
  getCenters() {
    this.centerService.getAllCenters().subscribe({
      next: (centers) => {
        this.centerList = centers;
        console.log('Fetched centers:', this.centerList);
      },
      error: (err) => {
        console.error('Error fetching centers:', err);
      },
    });
  }

  // Handler for file input changes
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.eventProfile = file;
    }
  }

  // Method to create a new event
  async createEvent() {
    const loading = await this.loadingController.create({
      message: 'Creating event...',
    });
    await loading.present();

    try {
      // Extract date and time from dateTimeInput
      const dateTime = new Date(this.dateTimeInput);
      this.date = dateTime.toISOString().split('T')[0]; // Extract date (YYYY-MM-DD)
      this.time = dateTime.toISOString().split('T')[1].slice(0, 5); // Extract time (HH:mm)

      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('dateTime[dates]', this.date);
      formData.append('dateTime[times]', this.time);
      formData.append('location', this.location);
      formData.append('maxParticipants', this.maxParticipants);
      formData.append('categories', this.categories);
      this.centerOfInterest.forEach((center) => {
        formData.append('centerOfInterest', center);
      });
      formData.append('price', this.price);
      formData.append('currency', this.currency);

      if (this.eventProfile) {
        formData.append('image', this.eventProfile);
      } else {
        formData.append('image', '');
      }

      const response = await this.eventS.createEvent(formData).toPromise();
      console.log('Event created successfully:', response);

      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Event created successfully!',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/tabs/home']);


    } catch (error: any) {
      console.error('Error creating event:', error);

      await loading.dismiss();

      const alert = await this.alertController.create({
        header: 'Create Failed',
        message: error?.error?.message || 'Something went wrong. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
