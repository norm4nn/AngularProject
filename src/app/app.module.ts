import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { CounterComponent } from './counter/counter.component';
import { YourRatingComponent } from './your-rating/your-rating.component';
import { FilterComponent } from './filter/filter.component';
import { SearchPipe } from './search-pipe.pipe';
import { SelectMinMaxPipe } from './select-min-max.pipe';
import { CartComponent } from './cart/cart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { HistoryViewComponent } from './history-view/history-view.component';
import { DateSetterComponent } from './date-setter/date-setter.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotificationComponent } from './notification/notification.component';
import { StatePipe } from './state.pipe';
import { SingeCourseViewComponent } from './singe-course-view/singe-course-view.component';


export const appRouter: Routes = [
  
  {path: 'trips', component: TripsComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'cart', component: CartViewComponent},
  {path: 'history', component: HistoryViewComponent},
  {path: 'create-new', component: CreateNewComponent},
  {path: 'course/:id', component: SingeCourseViewComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    SearchPipe,
    AppComponent,
    TripsComponent,
    CreateNewComponent,
    CounterComponent,
    YourRatingComponent,
    FilterComponent,
    SelectMinMaxPipe,
    CartComponent,
    HomePageComponent,
    CartViewComponent,
    HistoryViewComponent,
    DateSetterComponent,
    PageNotFoundComponent,
    NotificationComponent,
    StatePipe,
    SingeCourseViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRouter),
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebaseConfig ),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
