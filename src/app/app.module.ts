import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TruncateNamePipe } from './pipes/truncate-name.pipe';
import { PricePipe } from './pipes/price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    EditPopupComponent,
    TruncateNamePipe,
    PricePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RatingModule,
    FormsModule,
    PaginatorModule,
    DialogModule,
    ButtonModule,
    ConfirmPopupModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(), provideAnimations(), ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
