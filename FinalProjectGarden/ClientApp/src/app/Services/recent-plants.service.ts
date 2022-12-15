import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyGarden } from './my-garden';
import { Observable } from 'rxjs';
import { RecentPlants } from './recent-plants';

@Injectable({
  providedIn: 'root'
})
export class RecentPlantsService {
  

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
    
  }
  
  AddPlantToFavorite(commonName:string, plantimgurl:string, googleid: string): Observable<RecentPlants> {
    return this.http.post<RecentPlants>(
      this.baseUrl + `api/RecentPlants?googleId=${googleid}&commonName=${commonName}&img=${plantimgurl}`,
      {}
    );
  }
  //working
  UpdateMyGardens(googleId:string, id: number, plant: RecentPlants): Observable<RecentPlants> {
    console.log("gardenName",id)
    return this.http.put<RecentPlants>(this.baseUrl + `api/RecentPlants?googleId=${googleId}&gardenId=${plant.gardenId}`, plant);
  }
  //working
  getMyFavPlants(googleid: string): Observable<RecentPlants[]> {
    return this.http.get<RecentPlants[]>(this.baseUrl + `api/RecentPlants?googleId=${googleid}`);
  }
  //working
  DeleteMyGardensPlants(id: number): Observable<RecentPlants> {
    return this.http.delete<RecentPlants>(this.baseUrl + `api/RecentPlants/${id}`);
  }
  //working
  getAllPlantedPlants(googleid: string): Observable<RecentPlants[]>{
    return this.http.get<RecentPlants[]>(this.baseUrl + `api/RecentPlants/PlantsInGarden?googleId=${googleid}` );
  }
  getPlantsInGarden(gardenId: number): Observable<RecentPlants[]>{
    return this.http.get<RecentPlants[]>(this.baseUrl + `api/RecentPlants/PlantsInAGarden?gardenId=${gardenId}` );
  }
   //working
  getPlantedDetails(googleId:string, id: number):Observable<RecentPlants[]>{
    console.log("garden Id", id)
    return this.http.get<RecentPlants[]>(this.baseUrl + `api/RecentPlants/?googleId=${googleId}&gardenId${id}` );
  }
}
