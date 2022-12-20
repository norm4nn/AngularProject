import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CoursesService } from '../courses.service';
import { User } from '../trips/trips.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  users!: User[];
  persistance!: string;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(change => {
      this.users = [];
      for(let user of change) {
        this.users.push(user);
      }
    });
    this.authService.persistanceRef.doc('0').valueChanges().subscribe(change => {
      this.persistance = (change as any).current;
    });
  }

  changeBan(uid : string, isBanned : boolean) {
    this.authService.updateBan(uid, isBanned);
  }

  changeRole(uid : string, role : any) {
    this.authService.updateRole(uid, role);
  }

  changePersistance(persistance : string) {
    this.authService.updatePersistance(persistance);
    this.persistance = persistance;
  }


}
