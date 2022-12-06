import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-garden',
  templateUrl: './my-garden.component.html',
  styleUrls: ['./my-garden.component.css']
})
export class MyGardenComponent implements OnInit {

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;


  constructor(private authService: SocialAuthService) { }
  
  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
