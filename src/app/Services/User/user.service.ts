import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpService) { }

  Login(reqData:any){
    let header={
      headers:new HttpHeaders({
        'content-type':'application/json'
      })
    }
    return this.httpService.PostMethod('http://localhost:5021/api/User/login',reqData,false,header)
  }

  Register(reqData:any){
    let header={
      headers:new HttpHeaders({
        'content-type':'application/json'

      })
    }
    return this.httpService.PostMethod('http://localhost:5021/api/User',reqData,false,header)
  }

  forgotPassword(reqData:any){
    let header={
      headers:new HttpHeaders({
        'content-type':'application/json'
      })
    }
    return this.httpService.PostMethod('http://localhost:5021/api/User/ForgotPassword',reqData,false,header)
  }

  resetPassword(reqData: any, token: any){
    let header={
      headers:new HttpHeaders({
        'content-type':'application/json',
        'Authorization':'Bearer '+token
      })
    }
    return this.httpService.PostMethod('http://localhost:5021/api/User/ResetPassword',reqData,false,header)
  }

  // resetPassword(reqData: any, token: string){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`
  //   });
  
  //   return this.httpService.PostMethod(`http://localhost:5021/api/User/ResetPassword?password=${reqData.password}&confirmPassword=${reqData.confirmPassword}`, {}, false, headers);
  // }
}
