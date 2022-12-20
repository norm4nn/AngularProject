import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { CartViewComponent } from './cart-view/cart-view.component';
import { CreateNewComponent } from './create-new/create-new.component';
import { EditViewComponent } from './edit-view/edit-view.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';
import { HistoryViewComponent } from './history-view/history-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ModifyViewComponent } from './modify-view/modify-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpViewComponent } from './sign-up-view/sign-up-view.component';
import { SingeCourseViewComponent } from './singe-course-view/singe-course-view.component';
import { TripsComponent } from './trips/trips.component';

export const routes: Routes = [
  
  {path: 'trips', component: TripsComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'cart', component: CartViewComponent},
  {path: 'history', component: HistoryViewComponent, canActivate: [AuthGuard]},
  {path: 'create-new', component: CreateNewComponent, canActivate: [RoleGuard]},
  {path: 'edit', component: EditViewComponent, canActivate: [RoleGuard]},
  {path: 'course/:id', component: SingeCourseViewComponent},
  {path: 'modify/:id', component: ModifyViewComponent, canActivate: [RoleGuard]},
  {path: 'admin', component: AdminViewComponent, canActivate: [AdminGuard]},
  {path: 'signup', component: SignUpViewComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
