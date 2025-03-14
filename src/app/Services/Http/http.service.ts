import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  PostMethod(reqUrl: string, reqData: any, token: boolean = false, httpOption: any = {}): Observable<any> {
    return this.http.post(reqUrl, reqData, token ? httpOption : {});
  }

  PostMethodToken(reqUrl: string, reqData: any, token: boolean = true, httpOption: any = {}): Observable<any> {
    return this.http.post(reqUrl, reqData, token ? httpOption : {});
  }

  getService(reqUrl: string, token: boolean = false, httpOption: any = {}): Observable<any> {
    return this.http.get(reqUrl, token ? httpOption : {});
  }

  putService(reqUrl: string, reqData: any, token: boolean = false, httpOption: any = {}): Observable<any> {
    return this.http.put(reqUrl, reqData, token ? httpOption : {});
  }

  deleteService(reqUrl: string, token: boolean = false, httpOption: any = {}): Observable<any> {
    return this.http.delete(reqUrl, token ? httpOption : {});
  }

}
