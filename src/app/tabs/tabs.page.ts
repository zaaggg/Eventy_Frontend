import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { addIcons } from 'ionicons';
import { library, playCircle, radio, search, home, personCircleOutline, personCircle } from 'ionicons/icons';
import { IonTabs, IonIcon, IonTabButton, IonTabBar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class TabsPage  {
  constructor() {
    addIcons({playCircle,home,library,search,personCircle,personCircleOutline,radio});
  }
}
