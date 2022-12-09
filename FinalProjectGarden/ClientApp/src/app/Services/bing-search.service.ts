import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchImages } from './search-bing';

@Injectable({
  providedIn: 'root'
})
export class BingSearchService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl:string) { }


  getBingSearch(name:string, iteration: number):Observable<SearchImages>{
    return this.http.get<SearchImages>(this.baseUrl +`api/BingImage/?searched=${name}&iteration=${iteration}`);
  }

}
