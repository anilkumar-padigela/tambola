

export class Ticket {
    public A:number[][];

    constructor() {
        this.A = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]];

    }

    public getRowCount(r): number {
        var count = 0;
        for (var i = 0; i < 9; i++) {
            if (this.A[r][i] != 0) count++;
        }
        return count;
    }

    public getColCount(c): number {
        var count = 0;
        for (var i = 0; i < 3; i++) {
            if (this.A[i][c] != 0) count++;
        }
        return count;
    }
}