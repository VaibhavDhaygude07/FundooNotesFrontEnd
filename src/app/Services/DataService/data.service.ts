import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private messageSource = new BehaviorSubject([]);
  incomingData = this.messageSource.asObservable();

  private viewModeSubject = new BehaviorSubject<'grid' | 'list'>('grid');
  currentViewMode = this.viewModeSubject.asObservable();


  outgoingData(message: any) {
    console.log(message);
    this.messageSource.next(message);
  }

  changeViewMode(mode: 'grid' | 'list') {
    this.viewModeSubject.next(mode);
    console.log('View mode changed to:', mode); 
  }
  
}
