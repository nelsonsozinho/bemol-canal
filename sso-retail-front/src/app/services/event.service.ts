import { Injectable } from '@angular/core';
import { Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public listeners;
  public eventSubject;
  public events;  

  constructor() {
    this.listeners = {};
    this.eventSubject = new Subject();

    this.events = from(this.eventSubject);

    this.events.subscribe(
      ({name,args}) => {
        if(this.listeners[name]) {
          for(const listener of this.listeners[name]) {
            listener(...args);
          }
        }
      }
    )
   }

   on(name, listener) {
     if(!this.listeners[name]) {
       this.listeners[name] = [];
     }
     this.listeners[name].push(listener);
   }

   broadcast(name, ...args) {
     this.eventSubject.next({
       name,
       args
     })
   }

   removeListener(name) {
     delete this.listeners[name];
   }
   
}
