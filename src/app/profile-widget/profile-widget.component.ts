import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.css']
})
export class ProfileWidgetComponent implements OnInit {
  nick!: string;
  role!: string;
  constructor(private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.nick = '';
    this.role = '';
    this.authService.getCurrentUser().subscribe((user : any) => {
      this.authService.usersRef.doc(user?.uid + '').valueChanges().subscribe((user2 : any) => {
        this.nick = user2?.nick;
        this.role = user2?.role;
      })
    });
  }

}
