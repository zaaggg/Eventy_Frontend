import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonIcon, IonCard, IonListHeader, IonList, IonAvatar, IonText, IonFooter, IonButton, IonFabButton, 
  LoadingController} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, heartOutline, locationOutline } from 'ionicons/icons';
import { events } from 'src/app/data/events';
import { Event } from 'src/app/interfaces/event.interface';
import { Eventt } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { ParticipationService } from 'src/app/services/partitipation.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonButton, IonFooter, IonText, IonAvatar, IonList, IonListHeader, IonCard, 
    IonIcon,
    IonCol,
    IonRow,
    IonLabel,
    IonItem,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonContent,
  ],
})
export class EventPage implements OnInit {
  event!: Eventt;

  private route = inject(ActivatedRoute);


  constructor(private eventS: EventService ,
     public participationS : ParticipationService ,
      private alertController: AlertController,
      private loadingController: LoadingController,
      private router: Router) {
    addIcons({ calendarOutline, locationOutline, heartOutline });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id) {
      this.getEvent(id);
    }
  }

  getEvent(id: string) {
    this.event = this.eventS.allEvents.find((event) => event._id == id)!;
  }

  async sendRequest() {
    const loading = await this.loadingController.create({
      message: 'Sending request...',
    });
    await loading.present();

    this.participationS.sendParticipationRequest(this.event._id).subscribe({
      next: async (response) => {
        await loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Success',
          message: response.message || 'Request sent successfully!',
          buttons: ['OK'],
        });
        
        await alert.present();
      },
      error: async (error) => {
        await loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Error',
          message: error.error?.message || 'Failed to send request.',
          buttons: ['OK'],
        });
        await alert.present();

      },
    });
    this.router.navigate(['/tabs/home']);
  }
}
