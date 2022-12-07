import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyGarden } from './my-garden';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyGardenService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  PlantingGarden(garden:MyGarden) : Observable<MyGarden>{
    return this.http.post<MyGarden>(this.baseUrl + "api/MyGardens", garden);}
}
