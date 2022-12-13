import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyGarden } from './my-garden';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GardenDetailsService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {}


  GetMyGardensDetails(GardenName: String ): Observable<MyGarden> {
    return this.http.get<MyGarden>(this.baseUrl + `api/MyGardens/GardenDetails/${GardenName}`);
  }

}



