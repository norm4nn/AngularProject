import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';


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
import { environment } from '../environments/environment';



export const appRouter: Routes = [
  {path: '', component: TripsComponent},
  {path: 'trips', component: TripsComponent},
  {path: '**', component: TripsComponent}
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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRouter),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
