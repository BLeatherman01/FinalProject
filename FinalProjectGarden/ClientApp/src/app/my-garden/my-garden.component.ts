import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';

@Component({
  selector: 'app-my-garden',
  templateUrl: './my-garden.component.html',
  styleUrls: ['./my-garden.component.css'],
})
export class MyGardenComponent implements OnInit {
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
    private authService: SocialAuthService,
    private gardenService: MyGardenService,
    private searchedPlantService: SearchedPlantService
  ) {}

  ngOnInit(): void {
    this.getUserGarden();
  }

  UpdateGarden(index: number) {
    this.hideCards[index] = true;
    this.listGardens[index].gardenName = this.gardenName[index];
    this.listGardens[index].description = this.description[index];
    this.listGardens[index].plantDate = this.plantDate[index];
    this.listGardens[index].pickBloom = this.pickDate[index];
    this.listGardens[index].wateringFreq = this.waterFreq[index];
    this.listGardens[index].season = this.season[index];
    this.listGardens[index].notes = this.notes[index];

    this.gardenService
      .UpdateMyGardens(this.listGardens[index].id, this.listGardens[index])
      .subscribe((result: MyGarden) => {
        this.listGardens;
        console.log('Freeeeeeee' + result);
      });
  }

  RemoveFromGarden(index: number): void {
    this.gardenService
      .DeleteMyGardens(this.listGardens[index].id)
      .subscribe((result: MyGarden) => {
        this.listGardens.splice(index, 1);
      });
  }

  getUserGarden() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.gardenService
        .GetMyGardens(this.user.id)
        .subscribe((result: MyGarden[]) => {
          this.listGardens = result;
          //console.log("1"+ this.listGardens[0].plantId);
          this.listGardens.forEach((pid: MyGarden) => {
            //console.log(pid.plantId);
            this.searchedPlantService
              .getPlantById(pid.plantId)
              .subscribe((result: Plant) => {
                this.apiPlant.push(result);
                this.apiPlant.forEach((plant: Plant) => {
                  this.hideCards.push(false);
                });
                //console.log("2"+ result.common_name);
              });
          });
        });
    });
  }
}
