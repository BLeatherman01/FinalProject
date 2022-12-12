import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WikiSearch } from './search-wiki';
import { Secret } from './Services/secret';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
baseUrl: string = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=';

  constructor(private http: HttpClient) {}

  getWiki(name: string): Observable<WikiSearch>{
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', this.baseUrl
    );
    return this.http.get<WikiSearch>(
      this.baseUrl + name + '&format=json'
    );
  }

  }
