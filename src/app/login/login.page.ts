import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    RouterModule, // Import RouterModule here
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage {
  loginForm: FormGroup;
  invalidEmail: string | undefined;
  email = "";
  userId=''
  a: string | null = ''; 

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public userS: UserService,
    private router: Router
  ) {
    // Initialize the login form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Invalid Input',
        message: 'Please fill in all fields correctly.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Logging in...',
    });
    await loading.present();

    // Call the login API via UserService
    this.userS.onLogin(this.loginForm.value).subscribe({
      next: async (response) => {
        if (response.state) {
          this.userId = response.user.id; // Extract and store the ID
          console.log('User ID:', this.userId);
        }
        await loading.dismiss();

        // Extract the token from headers
        const token = response.headers.get('auth-token');
        if (token) {
          this.userS.setToken(token); // Save the token to localStorage
          console.log('Token saved:', token);
          this.userS.getUserConnected(this.email).subscribe({
            next: async (response) => {
              this.userS.userConnected = response.data; // Adjust to match the actual API response format
              console.log('User fetched:', this.userS.userConnected);
              this.router.navigate(['/tabs/home']);
            }
            });
          // Navigate to the home page
          console.log("usssssssssssssseeeeeeerrrrr  :",this.userS.userConnected);
          console.log ("this the email", this.userS.userConnected?.name)


        } else {
          console.error('Token not found in response headers:', response);
          const alert = await this.alertController.create({
            header: 'Login Error',
            message: 'Token is missing from the server response.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      },
      error: async (error) => {
        await loading.dismiss();

        // Show error alert
        const alert = await this.alertController.create({
          header: 'Login Failed',
          message: error.error?.message || 'Something went wrong. Please try again.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

}
