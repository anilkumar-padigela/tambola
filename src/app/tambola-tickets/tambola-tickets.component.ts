import { Component, OnInit } from '@angular/core';
import { Ticket } from './node';
@Component({
  selector: 'app-tambola-tickets',
  templateUrl: './tambola-tickets.component.html',
  styleUrls: ['./tambola-tickets.component.scss']
})
export class TambolaTicketsComponent implements OnInit {

  public tickets: Array<Ticket> ;
  public l1: Array<number> = new Array<number>();
  public l2: Array<number> = new Array<number>();
  public l3: Array<number> = new Array<number>();
  public l4: Array<number> = new Array<number>();
  public l5: Array<number> = new Array<number>();
  public l6: Array<number> = new Array<number>();
  public l7: Array<number> = new Array<number>();
  public l8: Array<number> = new Array<number>();
  public l9: Array<number> = new Array<number>();
  public columns: Array<Array<number>> = new Array<Array<number>>();

  public set1: Array<Array<number>> = new Array<Array<number>>();
  public set2: Array<Array<number>> = new Array<Array<number>>();
  public set3: Array<Array<number>> = new Array<Array<number>>();
  public set4: Array<Array<number>> = new Array<Array<number>>();
  public set5: Array<Array<number>> = new Array<Array<number>>();
  public set6: Array<Array<number>> = new Array<Array<number>>();

  public sets: Array<Array<Array<number>>> = new Array<Array<Array<number>>>();

  constructor() { }

  ngOnInit() {
    this.tickets = [];
    this.startGeneratingTickets();
  }

  public startGeneratingTickets() {

    for (var i = 0; i < 6; i++) {
      this.tickets[i] = new Ticket();
    }


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

    for (var i = 0; i < 9; i++) {
      this.set1.push(new Array<number>());
      this.set2.push(new Array<number>());
      this.set3.push(new Array<number>());
      this.set4.push(new Array<number>());
      this.set5.push(new Array<number>());
      this.set6.push(new Array<number>());
    }


    this.sets.push(this.set1);
    this.sets.push(this.set2);
    this.sets.push(this.set3);
    this.sets.push(this.set4);
    this.sets.push(this.set5);
    this.sets.push(this.set6);
//assigning elements to each set for each column
    for (var i = 0; i < 9; i++) {
      var li: Array<number> = this.columns[i];
      for (var j = 0; j < 6; j++) {
        var randNumIndex = this.getRand(0, li.length - 1);
        var randNum = li[randNumIndex];

        var set: Array<number> = this.sets[j][i];
        set.push(randNum);

        li.splice(randNumIndex, 1);
      }
    }

    //assign element from last column to random set
		var lastCol:Array<number> = this.columns[8];
		var randNumIndex: number = this.getRand(0, lastCol.length-1);
		var randNum = lastCol[randNumIndex];
		
		var randSetIndex = this.getRand(0,this.sets.length-1);
		var randSet:Array<number> = this.sets[randSetIndex][8];
		randSet.push(randNum);
		
    lastCol.splice(randNumIndex,1);
    

    //3 passes over the remaining columns
		for(var pass=0;pass<3;pass++) {
			for(var i=0;i<9;i++) {
				var col:Array<number> = this.columns[i];
				if(col.length==0) continue;
				
				var randNumIndex_p = this.getRand(0, col.length-1);
				var randNum_p = col[randNumIndex_p];
				
				 var vacantSetFound:boolean = false;
				while(!vacantSetFound) {
					var randSetIndex_p = this.getRand(0,this.sets.length-1);
					var randSet_p:Array<Array<number>> = this.sets[randSetIndex_p];
					
					if(this.getNumberOfElementsInSet(randSet_p)==15 || randSet_p[i].length==2) continue;
					
					vacantSetFound = true;
					randSet_p[i].push(randNum_p);					
					col.splice(randNumIndex_p,1);
				}
			}
    }
    
    //one more pass over the remaining columns
		for(var i=0;i<9;i++) {
			var col:Array<number> = this.columns[i];
			if(this.columns.length==0) continue;
			
			var randNumIndex_p = this.getRand(0, col.length-1);
			var randNum_p = col[randNumIndex_p];
			
			var vacantSetFound: boolean  = false;
			while(!vacantSetFound) {
				var randSetIndex_p = this.getRand(0,this.sets.length-1);
				var randSet_p:Array<Array<number>> = this.sets[randSetIndex_p];
				
				if(this.getNumberOfElementsInSet(randSet_p)==15 || randSet_p[i].length==3) continue;
				
				vacantSetFound = true;
				randSet_p[i].push(randNum_p);
				
				col.splice(randNumIndex_p,1);
			}
    }
    
    //sort the internal sets
		for(var i=0;i<6;i++){
			for(var j=0;j<9;j++){
			 this.sets[i][j] = 	this.sets[i][j].sort((n1:number,n2:number)=> n1 - n2);
			}
    }
    
    for(var setIndex=0;setIndex<6;setIndex++) {
			var currSet:Array<Array<number>> = this.sets[setIndex];
			var currTicket: Ticket = this.tickets[setIndex];
			
			//fill first row 
			for(var size=3;size>0;size--){
				if(currTicket.getRowCount(0)==5) break;
				for(var colIndex=0;colIndex<9;colIndex++){
					if(currTicket.getRowCount(0)==5) break;
					if(currTicket.A[0][colIndex]!=0) continue;
					
					var currSetCol:Array<number> = currSet[colIndex];
					if(currSetCol.length!=size) continue;
					
          currTicket.A[0][colIndex]=currSetCol[0];
          currSetCol.splice(0);
	 			}
			}
			
			//fill second row 
			for(var size=2;size>0;size--){
				if(currTicket.getRowCount(1)==5) break;
				for(var colIndex=0;colIndex<9;colIndex++){
					if(currTicket.getRowCount(1)==5) break;
					if(currTicket.A[1][colIndex]!=0) continue;
					
					  var currSetCol: Array<number> = currSet[colIndex];
					if(currSetCol.length!=size) continue;
					
          currTicket.A[1][colIndex]=currSetCol[0];
          currSetCol.splice(0);
	 			}
			}
			
			//fill third row 
			for(var size=1;size>0;size--){
				if(currTicket.getRowCount(2)==5) break;
				for(var colIndex=0;colIndex<9;colIndex++){
					if(currTicket.getRowCount(2)==5) break;
					if(currTicket.A[2][colIndex]!=0) continue;
					
					var currSetCol: Array<number> = currSet[colIndex];
					if(currSetCol.length!=size) continue;
					
          currTicket.A[2][colIndex]=currSetCol[0];
          currSetCol.splice(0);
	 			}
			}		
    }
    
    //print the tickets
		for(var i=0;i<6;i++){
			var currTicket: Ticket = this.tickets[i];			
			for(var r=0;r<3;r++){

				for(var cl=0;cl<9;cl++){

					var num = currTicket.A[r][cl];
					if(num!=0) console.log(num);
					
					if(cl!=8) console.log(",");
				}
				if(r!=2) console.log();
			}
			
			if(i!=5){
				console.log();
        console.log();
        console.log();
			}
		}

  }


  private getRand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private  getNumberOfElementsInSet( set: Array<Array<number>>): number{
    var count = 0;
    set.forEach(li=>{
      count += li.length;
    });
		
		return count;
	}

}
