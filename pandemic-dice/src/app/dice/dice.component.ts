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
  scoredDice = []
  score = 0
  rollScore = 0

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
    //move kept dice to scored to prevent rescoring
    for(var x = 0; x < this.keptDice.length; x++){
      this.sortDie(this.keptDice[x], this.dice);
      this.scoredDice.push(this.keptDice[x]);
    }

    //gen random ints for remaining dice
    for(var y = 0; y < this.dice.length; y++){
      var die = this.dice[y];
      die.pips = this.getRoll();
      this.dice[y] = die;
      console.log(die);
    }
  }

  getRoll(){
    var min = Math.ceil(1);
    var max = Math.floor(7);
    return Math.floor(Math.random() * (max - min) + min);
  }

  keep(die: Die){
    die.keep = !die.keep;
    if(die.keep){
      this.dice = this.sortDie(die, this.dice);
      this.keptDice.push(die);
      console.log(this.keptDice);
    } else {
      this.keptDice = this.sortDie(die, this.keptDice);
      this.dice.push(die);
    }
    this.scoreRoll(this.keptDice);
  }

  sortDie(die: Die, diceList){
    for(var x = 0; x < diceList.length; x++){
      if(die.id == diceList[x].id){
        diceList.splice(x, 1);
      }
    }
    return diceList
  }

  scoreRoll(diceList){
    var rollScore = 0;
    for(var x = 0; x < diceList.length; x++){
      console.log("Scoring die..", diceList[x].id, diceList[x].pips);
      var multiples = this.checkMultiples(diceList[x], diceList);
      console.log("Multiples", multiples);
      if(multiples >= 3){
        var factor = 0;
        var processing = []
        processing.push(diceList[x]);
        for(var y = 0; y < diceList.length; y++){
          if((diceList[x].id != diceList[y].id) && (diceList[x].pips == diceList[y].pips)){
            processing.push(diceList[y]);
          }
        }
        if(diceList[x].pips == 1){
          factor = 1000;
        } else {
          factor = diceList[x].pips * 100;
        }
        rollScore = factor;

        if (processing.length > 3) {
          for(var z = 0; z < (processing.length - 3); z++){
            rollScore += factor;
          }
        }
      }
      if(diceList[x].pips == 1 && multiples < 3){
        rollScore += 100;
      } else if(diceList[x].pips == 5 && multiples < 3){
        rollScore += 50;
      }
    }
    this.rollScore = rollScore;
  }

  checkMultiples(die: Die, diceList){
    var matchCount = 1;
    for(var x = 0; x < diceList.length; x++){
      var checkDie = diceList[x];
      if((die.id != checkDie.id) && (die.pips == checkDie.pips)){
        matchCount++;
      }
    }
    return matchCount;
  }
}
