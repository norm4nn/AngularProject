import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-up-view',
  templateUrl: './sign-up-view.component.html',
  styleUrls: ['./sign-up-view.component.css']
})
export class SignUpViewComponent implements OnInit {

  constructor(private authService : AuthenticationService) { }

  ngOnInit(): void {
  }

  signup (email : string, passwd : string) {
    this.authService.SignUp(email, passwd);
    document.querySelectorAll('input') .forEach(el => {
      el.value = '';
    });
  } 

  signin (email : string, passwd : string) {
    this.authService.SignIn(email, passwd);
    document.querySelectorAll('input') .forEach(el => {
      el.value = '';
    });
  } 

}
