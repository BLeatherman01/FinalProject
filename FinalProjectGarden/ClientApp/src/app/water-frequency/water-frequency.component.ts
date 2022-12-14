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

  constructor(
    private myGardens: MyGardenService,
    private authService: SocialAuthService,
    private searchedPlantService: SearchedPlantService,
    private recentPlants: RecentPlantsService
  ) {}

  ngOnInit(): void {
    this.getUserGarden();
  }
  getUserGarden() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.myGardens
        .GetMyGardens(this.user.id)
        .subscribe((result: MyGarden[]) => {
          this.listGardens = result;
          //console.log("1"+ this.listGardens[0].plantId);
          // this.listGardens.forEach((pid: MyGarden) => {
          //   //console.log(pid.plantId);
          //   this.searchedPlantService
          //     .getPlantById(pid.plantId)
          //     .subscribe((result: Plant) => {
          //       this.apiPlant.push(result);
          //       this.apiPlant.forEach((plant: Plant) => {
          //         this.hideCards.push(false);
          //       });
          //       //console.log("2"+ result.common_name);
          //     });
          // });
        });
    });
  }

  //   getWaterDate() {
  //     this.authService.authState.subscribe((user) => {
  //       this.user = user;
  //       this.loggedIn = user != null;
  //       this.myGardens
  //         .GetMyGardens(this.user.id)
  //         .subscribe((result:MyGarden) => {
  //           this.listGardens = result;
  // //           //console.log("1"+ this.listGardens[0].plantId);
  // //           // this.listGardens.forEach((pid: MyGarden) => {
  // //           //   //console.log(pid.plantId);
  // //           //   this.searchedPlantService
  // //           //     .getPlantById(pid.plantId)
  // //           //     .subscribe((result: Plant) => {
  // //           //       this.apiPlant.push(result);

  // //           //     });

  //             let todaysDate: Date = new Date();
  //             let waterDate: Date = new Date();
  //             if(this.listGardens[0].plantDate != undefined) {
  //              waterDate.setDate(this.listGardens[0].plantDate.getDate());

  //              //need to get difference of plant and todays date

  //             console.log("todays date", todaysDate)
  //             console.log("waterdate", waterDate )

  //             let datePipe: DatePipe = new DatePipe('en-US');
  //             let difference = Math.floor((Date.UTC(waterDate.getFullYear(), waterDate.getMonth(), waterDate.getDate()) -Date.UTC(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate())) /(1000 * 60 * 60 * 24));

  //             console.log(datePipe.transform(todaysDate, 'shortDate'));
  //             console.log("differnce between dates", difference)

  //             if(this.listGardens[0].wateringFreq != undefined){
  //             if(difference % this.listGardens[0].wateringFreq === 0){
  //               let waterMe = "water Me"
  //               console.log(waterMe)
  //             }

  //             }
  //           }
  //         });
  //     });
  //  }
}
