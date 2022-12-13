import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GardenDetailsService } from '../Services/garden-details.service';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';
import { DatePipe } from '@angular/common';


styleUrls: ['./my-garden.component.css'];

@Component({
  selector: 'app-garden-details',
  templateUrl: './garden-details.component.html',
  styleUrls: ['./garden-details.component.css']
})
export class GardenDetailsComponent implements OnInit {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
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
  showCard: boolean = false;

  constructor(
    private authService: SocialAuthService,
    private gardenService: MyGardenService,
    private searchedPlantService: SearchedPlantService,
    private gardenDetailsService: GardenDetailsService) {


     }

  ngOnInit(): void {
  }

getWateringDay(): void {
  
}

}
