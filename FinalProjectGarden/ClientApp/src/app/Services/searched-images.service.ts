import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchImage } from './searched-images';
import { Secret } from './secret';

@Injectable({
  providedIn: 'root',
})
export class SearchedImagesService {
  baseUrl: string = 'https://pixabay.com/api/';

  constructor(private http: HttpClient) {}

  getImages(name: string): Observable<SearchImage> {
    // console.log('Checking name', name);
    return this.http.get<SearchImage>(
      this.baseUrl + '?key=' + Secret.key2 + '&q=' + name + '&image_type=photo'
    );
  }
  getBingImage(name: string): Observable<any> {
    console.log('bing name', name);
    let headers = new HttpHeaders().set(
      'Ocp-Apim-Subscription-Key',
      '357039cab9d64bd9993062ff9d1da58b'
    );
    return this.http.get(
      `https://api.bing.microsoft.com/v7.0/images/search?q=${name}`,
      { headers: headers }
    );
  }
}
