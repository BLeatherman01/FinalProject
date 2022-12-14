import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { User } from 'oidc-client';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';
import { RecentPlants } from '../Services/recent-plants';
import { RecentPlantsService } from '../Services/recent-plants.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';
import { Users } from '../Services/users';

@Component({
  selector: 'app-my-garden',
  templateUrl: './my-garden.component.html',
  styleUrls: ['./my-garden.component.css'],
})
export class MyGardenComponent implements OnInit {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  showCard: boolean = false;
  users: Users[] = [];
  showGardenCard: boolean = false;
  hideGardenCards: boolean[] = [];

  listGardens: MyGarden[] = [];
  listPlants: RecentPlants[] = [];

  apiPlant: Plant[] = [];
  plantDate: Date[] = [];
  pickDate: Date[] = [];
  waterFreq: number[] = [];
  season: string[] = [];
  gardenName: string[] = [];
  newGarden: string = '';
  description: string[] = [];
  notes: string[] = [];
  hideCards: boolean[] = [];
  garId: Users = {} as Users;
  gooid = this.users.map((g) => g.googleID);
  UsersService: any;

  constructor(
    private authService: SocialAuthService,
    private gardenService: MyGardenService,
    private searchedPlantService: SearchedPlantService,
    private recentPlants: RecentPlantsService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    this.getUserGarden();
    this.getMyFavPlant();
  });
  this.UsersService.AddUser(this.user.name, this.user.id);
  }

  UpdateGarden(index: number) {
    this.hideCards[index] = true;
    this.listGardens[index].gardenName = this.gardenName[index];
    this.listGardens[index].description = this.description[index];
    this.listPlants[index].plantDate = this.plantDate[index];
    this.listPlants[index].pickBloom = this.pickDate[index];
    this.listPlants[index].wateringFreq = this.waterFreq[index];
    this.listPlants[index].season = this.season[index];
    this.listGardens[index].notes = this.notes[index];
    this.gardenService
      .UpdateMyGardens(this.listGardens[index].id, this.listGardens[index])
      .subscribe((result: MyGarden) => {
        this.listGardens;
      });
  }

  makeGarden(): void {
    this.gardenService
      .makeNewGarden(this.newGarden, this.user.id)
      .subscribe((result: MyGarden) => {
        console.log(result);
      });
  }

  RemoveFromGarden(index: number): void {
    this.gardenService
      .DeleteMyGardens(this.listGardens[index].id)
      .subscribe((result: MyGarden) => {
        this.listGardens.splice(index, 1);
      });
  }

  getMyFavPlant(): void {
    this.recentPlants
      .getMyFavPlants(this.user.id)
      .subscribe((result: RecentPlants[]) => {
        this.listPlants = result;
      });
  }

  getUserGarden(): void {
    this.gardenService
      .GetMyGardens(this.user.id)
      .subscribe((result: MyGarden[]) => {
        this.listGardens = result;
        //   //console.log("1"+ this.listGardens[0].plantId);
        //   this.listGardens.forEach((pid: MyGarden) => {
        //     //console.log(pid.plantId);
        //     this.searchedPlantService
        //       .getPlantById(pid.plantId)
        //       .subscribe((result: Plant) => {
        //         this.apiPlant.push(result);
        //         this.apiPlant.forEach((plant: Plant) => {
        //           this.hideCards.push(false);
        //         });
        //         //console.log("2"+ result.common_name);
        //       });
        //   });
        // });
      });
  }
}
