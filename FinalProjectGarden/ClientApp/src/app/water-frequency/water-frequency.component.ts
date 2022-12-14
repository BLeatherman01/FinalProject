import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';
import { Plant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-water-frequency',
  templateUrl: './water-frequency.component.html',
  styleUrls: ['./water-frequency.component.css'],
})
export class WaterFrequencyComponent implements OnInit {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  showCard: boolean = false;

  listGardens: MyGarden[] = [];
  apiPlant: Plant[] = [];
  plantDate: Date[] = [];
  pickDate: Date[] = [];
  waterFreq: number[] = [];
  season: string[] = [];
  gardenName: string[] = [];
  description: string[] = [];
  notes: string[] = [];
  hideCards: boolean[] = [];

  constructor(
    private myGardens: MyGardenService,
    private authService: SocialAuthService,
    private searchedPlantService: SearchedPlantService
  ) {}

  ngOnInit(): void {}

 
 
  // getUserGarden() {
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.loggedIn = user != null;
  //     this.myGardens
  //       .GetMyGardens(this.user.id)
  //       .subscribe((result: MyGarden[]) => {
  //         this.listGardens = result;
  //         //console.log("1"+ this.listGardens[0].plantId);
  //         this.listGardens.forEach((pid: MyGarden) => {
  //           //console.log(pid.plantId);
  //           this.searchedPlantService
  //             .getPlantById(pid.plantId)
  //             .subscribe((result: Plant) => {
  //               this.apiPlant.push(result);
  //             });
  //           //console.log("2"+ result.common_name);
  //         });
  //       });
  //   });
  // }
}
