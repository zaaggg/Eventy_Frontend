import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VerifyCodePage {
  verifyCodeForm: FormGroup;

  constructor(
    private userS: UserService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private fb: FormBuilder
  ) {
    this.verifyCodeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required],
    });
  }

  async verifyCode() {
    const loading = await this.loadingController.create({
      message: 'Verifying code...',
    });
    await loading.present();
  
    // Directly using the form data as the email value
    this.verifyCodeForm.value.email = this.userS.confirmEmail;
    console.log(this.verifyCodeForm.value.email);
    console.log(this.verifyCodeForm.value.token);
  
    this.userS.verifyEmailCode(this.verifyCodeForm.value).subscribe({
      next: async () => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'Email verified successfully! You can now log in.',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: err.error?.message || 'Invalid verification code.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
}
