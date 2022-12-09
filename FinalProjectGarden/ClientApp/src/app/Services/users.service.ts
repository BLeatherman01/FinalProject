import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {}

  AddUser(userName: string, googleID: string): void {
    //console.log(name);
    let u = { Id: 0, UserName: userName, GoogleID: googleID };
    // let newUser:Users = {id:0, userName:userName,googleID:googleID};
    this.http.post<Users>(this.baseUrl + 'api/Users', u).subscribe(
      (data) => {},
      (err) => {
        console.log('err' + err);
      }
    );
  }
}
