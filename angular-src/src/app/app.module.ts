import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from '../app/_helpers/index';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomepageComponent } from './_components/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { CarouselComponent } from './_components/carousel/carousel.component';
import { AllStoriesComponent } from './_components/all-stories/all-stories.component';
import { ContactUsComponent } from './_components/contact-us/contact-us.component';
import { AboutUsComponent } from './_components/about-us/about-us.component';
import { UpcomingEventsComponent } from './_components/upcoming-events/upcoming-events.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    HomepageComponent,
    NavbarComponent,
    AboutUsComponent,
    CarouselComponent,
    AllStoriesComponent,
    UpcomingEventsComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
