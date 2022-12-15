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
    });

    this.getMyFavPlant();
  }

  //works
  UpdateGarden(index: number) {
    this.listPlants[index].plantDate = this.plantDate[index];
    this.listPlants[index].pickBloom = this.pickDate[index];
    this.listPlants[index].wateringFreq = this.waterFreq[index];
    this.listPlants[index].season = this.season[index];
    this.recentPlants
      .UpdateMyGardens(
        this.user.id,
        this.listPlants[index].gardenId,
        this.listPlants[index]
      )
      .subscribe((result: RecentPlants) => {
        this.listPlants[0] = result;
      });
  }
//this works
  makeGarden(): void {
    this.gardenService
      .makeNewGarden(this.newGarden, this.user.id)
      .subscribe((result: MyGarden) => {
        console.log(result);
      });
  }
//this works
  RemoveFromGarden(index: number): void {
    this.recentPlants
      .DeleteMyGardensPlants(this.listPlants[index].id)
      .subscribe((result: RecentPlants) => {
        this.listPlants.splice(index, 1);
      });
  }
  //works
  deleteGarden(index:number):void{
    this.gardenService.DeleteMyGardens(this.listGardens[index].id).subscribe((result: MyGarden)=>{
   console.log(result)});
  }
//this works
  getMyFavPlant(): void {
    this.recentPlants
      .getMyFavPlants(this.user.id)
      .subscribe((result: RecentPlants[]) => {
        this.listPlants = result;
      });
  }
//this works
  getUserGarden(): void {
    this.gardenService
      .GetMyGardens(this.user.id)
      .subscribe((result: MyGarden[]) => {
        this.listGardens = result;
      });
  }

}
