import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private goals= new BehaviorSubject<any>(["earning1","earning2","earning3"]);
  goal=this.goals.asObservable();

  changeGoal(goal){
    this.goals.next(goal);
  }

  constructor() { }
}
