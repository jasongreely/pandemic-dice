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

  constructor() { }

  ngOnInit() {
    console.log("init");
    var dice = [];
    for(var x = 0; x < 6; x++){
      var die: Die = {
        id: x,
        pips: 0,
        keep: false
      }
      dice.push(die);
    }
    this.dice = dice;
    console.log(this.dice);
    this.rollDice();
  }

  rollDice(){
    for(var x = 0; x < this.dice.length; x++){
      var die = this.dice[x];
      die.pips = this.getRoll();
      this.dice[x] = die;
      console.log(die);
    }
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
      this.dice = this.sortDie(die, this.dice);
      this.keptDice.push(die);
      console.log(this.keptDice);
    } else {
      this.keptDice = this.sortDie(die, this.keptDice);
      this.dice.push(die);
      console.log(this.dice);
    }
  }

  sortDie(die: Die, diceList){
    for(var x = 0; x < diceList.length; x++){
      if(die.id == diceList[x].id){
        diceList.splice(x, 1);
      }
    }
    return diceList
  }
}
