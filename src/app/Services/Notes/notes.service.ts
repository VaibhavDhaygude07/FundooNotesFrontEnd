import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import  { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  outgoingData(value: any) {
    throw new Error('Method not implemented.');
  }
  
  http: any;
  
 
  // Removed duplicate deleteNote method to resolve the error.
  restoreNote(noteId: string) {
    throw new Error('Method not implemented.');
  }
  
  token: any;

  
constructor(private httpService: HttpService, private router: Router) {
  this.token = localStorage.getItem('token');
}
  addNotes(reqData: any) {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: 'text' as 'json' // 👈 Tell Angular to expect a text response
    };
    return this.httpService.PostMethod('http://localhost:5021/api/Notes', reqData, true, header);
  }

  getNotes() {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.httpService.getService('http://localhost:5021/api/Notes', true, header);
  }

  updateNotes(notesId: any,reqData: any ) {
    
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.httpService.putService(`http://localhost:5021/api/Notes/${notesId}`, reqData, true, header);
  }


  trashNotes(noteId: string) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.httpService.putService(
      `http://localhost:5021/api/Notes/${noteId}/Trash`, {}, true, headers
    );
  }
  
  

archiveNotes(noteId: string) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.httpService.putService(
      `http://localhost:5021/api/Notes/${noteId}/Archive`, {},  true,  header);
  }

  deleteNote(noteId: string) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.httpService.deleteService(
      `http://localhost:5021/api/Notes/${noteId}`, true, headers
    );
  }
 


}

 


