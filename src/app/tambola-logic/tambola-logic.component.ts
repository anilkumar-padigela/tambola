import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/tambola-tickets/node';

@Component({
  selector: 'app-tambola-logic',
  templateUrl: './tambola-logic.component.html',
  styleUrls: ['./tambola-logic.component.scss']
})
export class TambolaLogicComponent implements OnInit {

  public tickets: Array<Ticket> ;
  public l1: Array<number> = [];
  public l2: Array<number> = [];
  public l3: Array<number> = [];
  public l4: Array<number> = [];
  public l5: Array<number> = [];
  public l6: Array<number> = [];
  public l7: Array<number> = [];
  public l8: Array<number> = [];
  public l9: Array<number> = [];
  public columns: Array<Array<number>> = [];
  public set1:Array<Array<number>> = [];
  public set2:Array<Array<number>> = [];
  public set3:Array<Array<number>> = [];
  public set4:Array<Array<number>> = [];
  public set5:Array<Array<number>> = [];
  public set6:Array<Array<number>> = [];
  public sets:Array<Array<Array<number>>> = [];
  constructor() { }

  ngOnInit() {
    this.tickets = [];
    for(var i = 0 ; i< 6 ; i++){
      this.tickets.push(new Ticket());
    }
    this.startTheLogic();
  }

  public startTheLogic(){
    for (var i = 1; i <= 9; i++) {
      this.l1.push(i);
    }
    for (var i = 10; i <= 19; i++) {
      this.l2.push(i);
    }
    for (var i = 20; i <= 29; i++) {
      this.l3.push(i);
    }
    for (var i = 30; i <= 39; i++) {
      this.l4.push(i);
    }
    for (var i = 40; i <= 49; i++) {
      this.l5.push(i);
    }
    for (var i = 50; i <= 59; i++) {
      this.l6.push(i);
    }
    for (var i = 60; i <= 69; i++) {
      this.l7.push(i);
    }
    for (var i = 70; i <= 79; i++) {
      this.l8.push(i);
    }
    for (var i = 80; i <= 90; i++) {
      this.l9.push(i);
    }
    this.columns.push(this.l1);
    this.columns.push(this.l2);
    this.columns.push(this.l3);
    this.columns.push(this.l4);
    this.columns.push(this.l5);
    this.columns.push(this.l6);
    this.columns.push(this.l7);
    this.columns.push(this.l8);
    this.columns.push(this.l9);    
    console.log(this.columns,this.l1,this.l2, this.l3, this.l4, this.l5, this.l6, this.l7,this.l8, this.l8);

    for(var i=0;i<9;i++){
			this.set1.push(new Array<number>());
			this.set2.push(new Array<number>());
			this.set3.push(new Array<number>());
			this.set4.push(new Array<number>());
			this.set5.push(new Array<number>());
			this.set6.push(new Array<number>());
    }
    console.log("Set 1, 2, 3,4 , 5, 6")
    console.log(this.set1, this.set2, this.set3, this.set4, this.set5, this.set6)

    this.sets.push(this.set1);
    this.sets.push(this.set2);
    this.sets.push(this.set3);
    this.sets.push(this.set4);
    this.sets.push(this.set5);
    this.sets.push(this.set6);
    console.log("Sets is ", this.sets);


    //from l1 distribute the numbers into each set and same for l1 to l9

    for(var i= 0 ; i<9; i++){
      var tempList: Array<number> = this.columns[i];
      //Now from temp list pick a ranumdom index. 
      //from this randome index pick a value from temp list
      for(var j = 0 ; j<6; j++){
        var randomIndex: number = Math.floor(Math.random() * (tempList.length - 0) + 0);
        var randomNumber: number = tempList[randomIndex];
        this.sets[j][i].push(randomNumber);
        tempList.splice(randomIndex, 1);
      }
    }

    console.log("After assigning values in each 1st column of every set");
    console.log(this.columns, this.sets);

    //l9 contains five numbers . One from this number 
    //should be moved to any of the set in 9 column

    var lastCol: Array<number> = this.columns[8];
    var randomSet: number = Math.floor(Math.random() * (this.sets.length - 0) + 0);
    var colrandomIndex = Math.floor(Math.random() * (lastCol.length - 0) + 0);
    this.sets[randomSet][8].push(lastCol[colrandomIndex]);
    this.columns[8].splice(colrandomIndex, 1);

    console.log("After remiving 5th element fromthe 8th row");
    console.log(this.columns, this.sets);

    //Now each columns has 4 elements except l1 as 3
    //Spread the remaining elements in the sets 
    //here the condition is any set should not contain more than 15 elements
    //In any sheet , given column should not have 2 elements

    for(var size = 0; size <3 ; size++){
      //debugger;
      for(var i = 0 ; i<9; i++){
        var tempList = this.columns[i];
        if(tempList.length==0) continue;
         var randomIndex: number =  Math.floor(Math.random() * (tempList.length - 0) + 0);
         var randomNumber: number =  tempList[randomIndex];
         var vacantFound: boolean = false;
         while(!vacantFound){
          //take any rondom set now
          var randomSetIndex = Math.floor(Math.random() * (this.sets.length - 0) + 0);
         // check if the set has 15 numbers or that set column has 2 numbers
         if(this.getElementsCount(this.sets[randomSetIndex]) == 15 || this.sets[randomSetIndex][i].length == 2){
            continue;
          }
          vacantFound = true;
          this.sets[randomSetIndex][i].push(randomNumber);
          this.columns[i].splice(randomIndex, 1);
         }
      }

      //After completing of 3 passes 
      console.log("After completing of 3 passes");
      console.log(this.columns, this.sets);

    }

    for(var i = 0 ; i<9; i++){
      var tempList = this.columns[i];
      if(tempList.length==0) continue;
       var randomIndex: number =  Math.floor(Math.random() * (tempList.length - 0) + 0);
       var randomNumber: number =  tempList[randomIndex];
       var vacantFound: boolean = false;
       while(!vacantFound){
        //take any rondom set now
        var randomSetIndex = Math.floor(Math.random() * (this.sets.length - 0) + 0);
       // check if the set has 15 numbers or that set column has 2 numbers
       if(this.getElementsCount(this.sets[randomSetIndex]) == 15 || this.sets[randomSetIndex][i].length == 3){
          continue;
        }
        vacantFound = true;
        this.sets[randomSetIndex][i].push(randomNumber);
        this.columns[i].splice(randomIndex, 1);
       }
    }

    console.log("After completing the fourth pass");
    console.log(this.columns, this.sets);

    //Sort each column in earch set
    for(var j = 0 ; j < 6 ; j++){
      for(var i = 0 ; i<9 ; i++){
        this.sets[j][i].sort((n1,n2)=> {return n1-n2});
      }
    }

    console.log("After sorting");
    console.log(this.sets);

    //got the sets - need to arrange in tickets now
    
    for(var ticketNumber = 0 ; ticketNumber < 6 ; ticketNumber ++ ){
      var ticket: Ticket = this.tickets[ticketNumber];
      var set: Array<Array<number>> = this.sets[ticketNumber];

      //fill first row
      //check if the first row of the set has 5. If has 5 then break 
      //else insert set into A[3][9] matrix.
      for(var size=3;size>0;size--){
				if(ticket.getRowCount(0)==5) break;
				for(var colIndex=0;colIndex<9;colIndex++){
					if(ticket.getRowCount(0)==5) break;
					if(ticket.A[0][colIndex]!=0) continue;					
					var currSetCol: Array<number> = set[colIndex];
					if(currSetCol.length!=size) continue;//This is one way of specifying the condition
					
          ticket.A[0][colIndex]=currSetCol[0];
          currSetCol.splice(0,1);
	 			}
			}
      //fill second row

      //fill second row 
			for(var size=2;size>0;size--){
				if(ticket.getRowCount(1)==5) break;
				for(var colIndex=0;colIndex<9;colIndex++){
					if(ticket.getRowCount(1)==5) break;
					if(ticket.A[1][colIndex]!=0) continue;					
					var currSetCol: Array<number> = set[colIndex];
					if(currSetCol.length!=size) continue;
					
          ticket.A[1][colIndex]=currSetCol[0];
          currSetCol.splice(0,1);
	 			}
			}
      //fill third row
      //fill third row 
			for(var size=1;size>0;size--){
				if(ticket.getRowCount(2)==5) break;
				for(var colIndex=0;colIndex<9;colIndex++){
					if(ticket.getRowCount(2)==5) break;
					if(ticket.A[2][colIndex]!=0) continue;
					
					var currSetCol: Array<number> = set[colIndex]
					if(currSetCol.length!=size) continue;
					
          ticket.A[2][colIndex]=currSetCol[0];
          currSetCol.splice(0,1);
	 			}
			}	

    }

    console.log("After filling 3  rows");
    console.log(this.sets);
    //print the tickets
		for(var i=0;i<6;i++){
      var currTicket:Ticket = this.tickets[i];
    
    for(var r=0;r<3;r++){
      for(var col=0;col<9;col++){
        var num = currTicket.A[r][col];
        if(num!=0) console.log(num);
        
        if(col!=8) console.log(",");
      }
      if(r!=2) console.log();
    }
    
    if(i!=5){
      console.log();
      console.log();
      console.log();
    }
  }

  console.log(this.tickets);

  }


  private getElementsCount(set: Array<Array<number>>): number{

    var count = 0;
    set.forEach((colList:Array<number>)=>{
      count = count + colList.length;
    })
    return count;

  }

}
