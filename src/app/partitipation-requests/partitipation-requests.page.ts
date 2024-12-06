import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, LoadingController, IonItem, IonCard, IonLabel, IonList, IonButton, IonFooter, IonAvatar, IonIcon } from '@ionic/angular/standalone';
import { EventService } from '../services/event.service';
import { ParticipationService } from '../services/partitipation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountConnected } from '../models/account-connected.model';
import { ParticipationResponse } from '../models/participation-response.model';



@Component({
  selector: 'app-partitipation-requests',
  templateUrl: './partitipation-requests.page.html',
  styleUrls: ['./partitipation-requests.page.scss'],
  standalone: true,
  imports: [ IonAvatar, IonFooter, IonButton, IonList, IonLabel, IonCard, IonItem, IonContent, CommonModule, FormsModule]
})
export class PartitipationRequestsPage implements OnInit {
  eventId: string = '';
  requestList: ParticipationResponse[] = [];;
  private route = inject(ActivatedRoute);

  constructor(
    private eventS: EventService,
    public participationS: ParticipationService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventId = id as string;
    console.log('Event ID:', id);
    if (id) {
      this.getRequests();
    }
  }

  getRequests() {
    this.participationS.getAllRequests(this.eventId).subscribe(
      (response: { message: string; requests: ParticipationResponse[] }) => {
        this.requestList = response.requests;
      },
      (error) => {
        console.error('Error fetching participation requests:', error);
      }
    );
  }

  approveRequest(requestId: string) {
 // You can replace it with the actual token from the authentication service
    this.participationS
      .approveRequest(requestId)
      .subscribe(
        (response) => {
          console.log('Request approved:', response);
          this.showAlert('Success', 'Participation request has been approved!');
          this.getRequests(); // Refresh the request list after approval
        },
        (error) => {
          console.error('Error approving request:', error);
          this.showAlert('Error', 'Failed to approve participation request.');
        }
      );
  }

  // Method to reject a request
  rejectRequest(requestId: string) {
 // Replace with actual token
    this.participationS
      .rejectRequest(requestId)
      .subscribe(
        (response) => {
          console.log('Request rejected:', response);
          this.showAlert('Success', 'Participation request has been rejected!');
          this.getRequests(); // Refresh the request list after rejection
        },
        (error) => {
          console.error('Error rejecting request:', error);
          this.showAlert('Error', 'Failed to reject participation request.');
        }
      );
  }

  // Helper method to show alerts
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
