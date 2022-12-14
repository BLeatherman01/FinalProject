import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { MyGarden } from './my-garden';
import { MyGardenService } from './my-garden.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private myGarden: MyGardenService) {}

  AddUser(userName: string, googleID: string): void {
    //console.log(name);
    let u = { Id: 0, UserName: userName, GoogleID: googleID };
    // let newUser:Users = {id:0, userName:userName,googleID:googleID};
    this.http.post<Users>(this.baseUrl + 'api/Users', u).subscribe((result: Users)=> {
      if(result !== null) {
      let favgard: MyGarden = {id:0, gardenName:"FavoriteGarden", description:"This is your Favorites bucket", gardenId:0, notes:"You can keep notes about your plants here" } 
      this.myGarden.PlantingGarden(favgard, googleID).subscribe((result: MyGarden)=> {

      })}      
    });
  }
}
