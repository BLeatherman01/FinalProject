import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyGarden } from './my-garden';
import { Observable } from 'rxjs';
import { RecentPlants } from './recent-plants';

@Injectable({
  providedIn: 'root',
})
export class MyGardenService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  PlantingGarden(garden: MyGarden, googleid: string): Observable<MyGarden> {
    return this.http.post<MyGarden>(
      this.baseUrl + `api/MyGardens?googleId=${googleid}`,
      garden
    );
  }
  makeNewGarden(gardenName:string, googleId:string): Observable<MyGarden>{
    return this.http.post<MyGarden>(
      this.baseUrl + `api/MyGardens?googleId=${googleId}&gardenName=${gardenName}`,
    {}
    );
  }

  GetMyGardens(googleid: string): Observable<MyGarden[]> {
    return this.http.get<MyGarden[]>(this.baseUrl + `api/MyGardens/${googleid}`);
  }
  
  UpdateMyGardensInfo(googleId:string, id: number, plant: RecentPlants, gardenName:string ): Observable<RecentPlants> {
    return this.http.put<RecentPlants>(this.baseUrl + `api/RecentPlants/${googleId}?gardenId=${id}&gardenName=${gardenName}`, plant);
  }
  
  
 
  // UpdateMyGardens(id: number, plant: MyGarden): Observable<MyGarden> {
  //   return this.http.put<MyGarden>(this.baseUrl + `api/MyGardens/${id}`, plant);
  // }

  DeleteMyGardens(gardenid: number): Observable<MyGarden> {
    console.log("garden id", gardenid)
    return this.http.delete<MyGarden>(this.baseUrl + `api/MyGardens/${gardenid}`);
  }

  getPlantByGarden(id: number): Observable<MyGarden> {
    return this.http.get<MyGarden>(this.baseUrl + `api/MyGardens/${id}`);
  }
}
