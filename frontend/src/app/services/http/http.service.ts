import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = "http://localhost:8080/"

  constructor(private http:HttpClient) { }

  get(path:string):Observable<any> {
    let options = {  };
    return this.http.get<HttpResponse<any>>(this.baseUrl + path, options)
      .pipe(catchError(this.handleError<any>('get', [])));
  }

  post(path:string, body:any):Observable<any> {
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post<HttpResponse<any>>(this.baseUrl + path, body, options)
      .pipe(catchError(this.handleError<any>('post', [])));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return throwError(error.error)
    }
  }
}
