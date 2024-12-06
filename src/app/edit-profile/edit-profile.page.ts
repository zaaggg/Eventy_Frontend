import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CenterService } from '../services/center.service';
import { Center } from '../models/center.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditProfilePage implements OnInit {
  name : string  = this.userS.userConnected?.name as string;
  phone = this.userS.userConnected?.phone as string;
  address= this.userS.userConnected?.address as string;

  centerOfInterest: string[] = [];
  profilePhoto: File | null = null;
  centerList: Center[] = [];
  selectedImage: string | null = null; // State for previewing selected image

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private centerService: CenterService,
    private router: Router,
    public userS: UserService
  ) {}

  ngOnInit() {
    this.getCenters();
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

  // Handle file input changes and update preview
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.profilePhoto = file; // Assign file to the profilePhoto state

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result; // Set the selected image for preview
      };
      reader.readAsDataURL(file);
    }
  }

  // Trigger file input manually
  triggerFileInput(): void {
    const fileInput: HTMLElement | null = document.querySelector('#fileInput');
    fileInput?.click();
  }

  // Edit user profile
  async editProfile() {
    const loading = await this.loadingController.create({
      message: 'Editing Profile...',
    });
    await loading.present();
  
    try {
      const formData = new FormData();
      formData.append('title', this.name);
      formData.append('phone', this.phone);
      formData.append('adress', this.address);
  
      // Append each center of interest separately
      this.centerOfInterest.forEach((center) => {
        formData.append('centerOfInterest', center);
      });
  
      if (this.profilePhoto) {
        formData.append('image', this.profilePhoto);
      } else {
        formData.append('image', '');
      }
  
      const response = await this.userS.editUserProfile(formData).toPromise();
      console.log('Profile edited successfully:', response);
  
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'Profile edited successfully!',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/tabs/home']);
    } catch (error: any) {
      console.error('Error editing profile:', error);
  
      await loading.dismiss();
  
      const alert = await this.alertController.create({
        header: 'Edit Failed',
        message: error?.error?.message || 'Something went wrong. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
