import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ParticipationService } from '../services/partitipation.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
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
export class QrScannerPage implements OnInit {
  private html5QrcodeScanner: Html5QrcodeScanner | null = null; // Store scanner instance

  constructor(
    private participationService: ParticipationService, // Inject the service
    private alertController: AlertController // Inject AlertController
  ) {}

  ngOnInit(): void {
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    this.html5QrcodeScanner.render(
      (decodedText: string) => {
        console.log('Scanned QR Code:', decodedText);
        this.handleScannedCode(decodedText); // Process the scanned code
      },
      (error: any) => {
        console.error('QR Code scan error:', error);
      }
    );
  }

  private async handleScannedCode(qrCodeData: string) {
    // Stop the scanner after scanning
    this.html5QrcodeScanner?.clear();
    this.html5QrcodeScanner = null; // Prevent further scans

    // Call the backend to verify the QR code
    try {
      const response = await this.participationService
        .verifyCheckIn(qrCodeData)
        .toPromise();

      // Show success message
      this.showAlert('Check-In Successful', `Message: ${response.message}`);
    } catch (error: any) {
      console.error('Check-in error:', error);

      // Show error message
      const message = error.error?.message || 'Check-In failed. Please try again.';
      this.showAlert('Check-In Failed', message);
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'], // Close button
    });
    await alert.present();
  }
}