import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    loadChildren: () => // For lazy loading the module
      import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path:'contact',
    loadChildren: () => // For lazy loading the module
      import('./modules/contact-us/contact-us.module').then((m) => m.ContactUsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
