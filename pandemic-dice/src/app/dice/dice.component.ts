import { Component, OnInit } from '@angular/core';
import { Die } from "../die";

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnInit {

  dice = [];
  constructor() { }

  ngOnInit() {
    var dice_count=6;
    for(var x = 0; x < dice_count; x++){
      var die: Die = {
        id: x,
        pips: this.roll(),
        keep: false
      }
      this.dice.push(die);
    }

  }

  roll(){
    var min = Math.ceil(1);
    var max = Math.floor(7);
    return Math.floor(Math.random() * (max - min) + min);
  }

}
