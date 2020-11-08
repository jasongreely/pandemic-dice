import { Component, OnInit } from '@angular/core';
import { Die } from "../die";

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnInit {

  dice = []
  keptDice = []
  diceCount = 6

  constructor() { }

  ngOnInit() {
    this.dice = this.rollDice();
  }

  rollDice(){
    var dice = [];
    for(var x = 0; x < this.diceCount; x++){
      var die: Die = {
        id: x,
        pips: this.getRoll(),
        keep: false
      }
      dice.push(die);
    }
    return dice;
  }

  getRoll(){
    var min = Math.ceil(1);
    var max = Math.floor(7);
    return Math.floor(Math.random() * (max - min) + min);
  }

  keep(die: Die){
    console.log("keep die {}, {} pips", die.id, die.pips);
    die.keep = !die.keep;
    if(die.keep){
      this.keptDice.push(die);
    } else {
      for(var x = 0; x < this.keptDice.length; x++){
        if(die.id == this.keptDice[x].id){
          this.keptDice.splice(x, 1);
        }
      }
    }
  }
}
