import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})



export class AppService {

  constructor(private http: HttpClient) { }


async get(url: string) {
  try {
    const resp = await this.http.get(url).toPromise();
    return resp;
  } catch (e) {
    return null;
  }
}

async post(url: string, data ?: any) {
  try {
    let header = new HttpHeaders();

    const resp = await this.http.post(url, data, {
      headers: {

      },
      // params: data
    }).toPromise();
    return resp;
  } catch (e) {
    return null;
  }
}
}

