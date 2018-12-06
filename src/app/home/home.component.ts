import { Component, OnInit, Optional } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  /**template can be here also */
  //template: ' this is my html',
  templateUrl: './home.component.html',
  /**style can be here too */
  // styles:[`
  // p{ font-weight:bold}
  // div{ color:red;}
  // `],
  styleUrls: ['./home.component.scss'],

  /**animation part */
  animations: [
    trigger("animationGoals", [
      transition("* => *", [
        query(":enter", style({ opacity: 0 }), { optional: true }),
        /**for adding animation */
        query(":enter", stagger("300ms", [
          animate(".6s ease-in", keyframes([
            style({ opacity: 0, transform: "translateY(-75%)", offset: 0 }),
            style({ opacity: .5, transform: "translateY(35px)", offset: 0.3 }),
            style({ opacity: 1, transform: "translateY(0)", offset: 1.0 })
          ]))
        ]), { optional: true }),
        /**for removing animation */
        
        query(":leave", stagger("300ms", [
          animate(".6s ease-out", keyframes([
            style({ opacity: 1, transform: "translateY(0)", offset: 0 }),
            style({ opacity: .5, transform: "translateY(35px)", offset: 0.3 }),
            style({ opacity: 0, transform: "translateY(-75%)", offset: 1.0 })
          ]))
        ]), { optional: true }),

      ])

    ])

  ]

})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = "ADD An Item";
  goalText: string = "My life first goal is ";
  // goals = ["demo1", "demo2", "demo3"];
  goals = [];
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals)
  }

  /**onclick functionality */
  addItem() {
    this.goals.push(this.goalText);
    this.goalText = "";
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals)
  }
  removeItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals)
  }

}
