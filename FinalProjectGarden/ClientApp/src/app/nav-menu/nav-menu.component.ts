import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements OnInit {
  isExpanded = false;
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;


  constructor(private authService: SocialAuthService, private UsersService: UsersService) { }
  
  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.UsersService.AddUser(this.user.name, this.user.id);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
  
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }


}
