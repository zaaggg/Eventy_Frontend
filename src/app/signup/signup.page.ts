import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';

import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SignupPage {
  signupForm: FormGroup;
  invalidEmail: string | undefined;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public userS: UserService,
    private router: Router
  ) {
    // Initialize the form
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  async createAccount() {
    if (this.signupForm.invalid) {
      // Show an alert if form is invalid
      const alert = await this.alertController.create({
        header: 'Invalid Input',
        message: 'Please fill all fields correctly.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creating account...',
    });
    await loading.present();

    this.userS.onSignup(this.signupForm.value).subscribe({
      next: async (response) => {
        await loading.dismiss();
        // Navigate to login page on success
        this.router.navigate(['/verify-code']);
        console.log("jawwek behi");
        this.userS.confirmEmail = this.signupForm.value.email;
      },
      error: async (error) => {
        await loading.dismiss();
        console.error('Signup error:', error);
        this.invalidEmail = error.error?.message || 'Something went wrong';
        // Show an alert with error details
        const alert = await this.alertController.create({
          header: 'Signup Failed',
          message: this.invalidEmail,
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
}
