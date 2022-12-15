import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';
import { Plant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RecentPlants } from '../Services/recent-plants';
import { RecentPlantsService } from '../Services/recent-plants.service';

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
  plantedPlants: RecentPlants[] = [];
  needsWater:RecentPlants[] = [];
  constructor(
    private myGardens: MyGardenService,
    private authService: SocialAuthService,
    private searchedPlantService: SearchedPlantService,
    private recentPlants: RecentPlantsService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.recentPlants
        .getAllPlantedPlants(this.user.id)
        .subscribe((result: RecentPlants[]) => {
          this.plantedPlants = result;
          this.getWaterDate();

        });
      this.getUserGarden();
    });
  }
  getUserGarden() {
    this.myGardens
      .GetMyGardens(this.user.id)
      .subscribe((result: MyGarden[]) => {
        this.listGardens = result;
      });
  }
  //working
  getWaterDate() {
    let todaysDate: Date = new Date();
   for(let i = 0; i <this.listGardens.length; i++){

   
    let waterDate = new Date(this.plantedPlants[i].plantDate!);
    //need to get difference of plant and todays date

    let datePipe: DatePipe = new DatePipe('en-US');
    let difference = Math.floor(
      (Date.UTC(
        waterDate.getFullYear(),
        waterDate.getMonth(),
        waterDate.getDate()
      ) -
        Date.UTC(
          todaysDate.getFullYear(),
          todaysDate.getMonth(),
          todaysDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );

    if(difference > 0){
    }
   else if (difference % this.plantedPlants[i].wateringFreq! === 0) {
      let waterMe = 'water Me';
      this.needsWater.push(this.plantedPlants[i]);
    }
  }
  }
}
