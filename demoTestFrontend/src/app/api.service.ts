import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { applicationUrls } from './application-urls.const';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8 ',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      })
    };
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  // #region get rectangle height width and perimeter
  readJsonFile(): Observable<any> {
    console.log('call from service');
    
    return this.httpClient
      .get<any>(`${applicationUrls.readJson.read}`, this.httpOptions)
      .pipe(
        tap((response) => {
          if (response) {
            console.log(response);
            
          }
        })
      );
  }
  //#region 

  // #region get rectangle height width and perimeter
  save(readJsonDto : any): Observable<any> {
    console.log(readJsonDto);
    
    return this.httpClient.post<any>(`${applicationUrls.readJson.save}`,readJsonDto );
}
  //#region 

}
