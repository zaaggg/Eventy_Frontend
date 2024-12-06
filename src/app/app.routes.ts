import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';


export const routes: Routes = [
  
  {
    path: 'home',
    children: [
      {
        path: '',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'event/:id',
        loadComponent: () => import('./home/event/event.page').then( m => m.EventPage)
      },
      {
        path: 'events/:id',
        loadComponent: () => import('./home/events/events.page').then(m => m.EventsPage),
      },

    ],
    
  },
  {
    path: 'my-partitipations',
    children: [
      {
        path: '',
        loadComponent: () => import('./my-partitipations/my-partitipations.page').then((m) => m.MyPartitipationsPage),
      },
      {
        path: 'eventss/:id',
        loadComponent: () => import('./my-partitipations/eventss/eventss.page').then( m => m.EventssPage)
      },

    ],
    
  },

  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'my-events',
        loadComponent: () => import('./my-events/my-events.page').then( m => m.MyEventsPage)
      },
      {
        path: 'edit-profile',
        loadComponent: () => import('./edit-profile/edit-profile.page').then( m => m.EditProfilePage)
      },
      {
        path: 'my-partitipations',
        loadComponent: () => import('./my-partitipations/my-partitipations.page').then( m => m.MyPartitipationsPage)
      },
      {
        path: 'partitipation-requests/:id',
        loadComponent: () => import('./partitipation-requests/partitipation-requests.page').then(m => m.PartitipationRequestsPage),
      },
      {
        path: 'participators/:id',
        loadComponent: () => import('./participators/participators.page').then( m => m.ParticipatorsPage)
      },


      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },

    ],
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'create-event',
    loadComponent: () => import('./create-event/create-event.page').then( m => m.CreateEventPage)
  },
  {
    path: 'verify-code',
    loadComponent: () => import('./verify-code/verify-code.page').then( m => m.VerifyCodePage)
  },
  {
    path: 'my-events',
    loadComponent: () => import('./my-events/my-events.page').then( m => m.MyEventsPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'my-partitipations',
    loadComponent: () => import('./my-partitipations/my-partitipations.page').then( m => m.MyPartitipationsPage)
  },
  {
    path: 'partitipation-requests',
    loadComponent: () => import('./partitipation-requests/partitipation-requests.page').then( m => m.PartitipationRequestsPage)
  },
  {
    path: 'qr-scanner',
    loadComponent: () => import('./qr-scanner/qr-scanner.page').then( m => m.QrScannerPage)
  },
  {
    path: 'participators',
    loadComponent: () => import('./participators/participators.page').then( m => m.ParticipatorsPage)
  },


  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }