import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  deleteNote(noteId: string) {
    throw new Error('Method not implemented.');
  }
  restoreNote(noteId: string) {
    throw new Error('Method not implemented.');
  }
  deleteNotePermanently(noteId: string) {
    throw new Error('Method not implemented.');
  }
  token: any;

  constructor(private httpService: HttpService) {
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


 // In notes.service.ts
trashNotes(noteId: string) {
  let header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };
  return this.httpService.putService(`http://localhost:5021/api/Notes/${noteId}/Trash`, {}, true, header);
}


  archiveNotes(noteId: string) {
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.httpService.putService(`http://localhost:5021/api/Notes/${noteId}/Archive`, {}, true, header);
  }
}

function throwError(arg0: () => Error) {
  throw new Error('Function not implemented.');
}
