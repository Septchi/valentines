let grid;
let total;
let curr = 0;


class Tile{
  constructor(row, col){
    this.r = row;
    this.c = col;
    this.count = 0;
    this.bomb = false;
    this.val = 'X';
  }
}

class Pos{
  constructor(r, c){
    this.r = r;
    this.c = c;
  }
}
class Grid{
  constructor(r, c){
    this.row = r;
    this.col = c;
    this.board = new Array();
    for(let i=0;i<r;i++){
      this.board[i] = new Array();
      for(let j=0; j<c;j++){
        this.board[i].push(new Tile(i, j)); 
      }
    }
  }
  
  setNum(r, c){
    let minR = r - 1; minR = minR < 0 ? 0 : minR;
    let maxR = r + 2; maxR = maxR > this.row ? this.row : maxR;
    let minC = c - 1; minC = minC < 0 ? 0 : minC;
    let maxC = c + 2; maxC = maxC > this.col ? this.col : maxC;
    for(let i=minR; i<maxR;i++){
      for(let j=minC; j<maxC; j++){
        this.board[i][j].count +=1;
      }
    }
  }
  
  drawBomb(){
    let h = [[[2,9], [8, 9]], [[5, 10], [5, 11]], [[2,12], [8, 12]]];
    let a1 = [[[2, 16], [2,17]], [[3, 15], [8, 15]], [[3, 18], [8, 18]], [[6, 16], [6, 17]]];
    let p1 = [[[2, 21], [8,21]], [[2,22], [2, 23]], [[5, 22], [5, 23]], [[3, 24], [4, 24]]];
    let p2 = [[[2, 27], [8,27]], [[2,28], [2, 29]], [[5, 28], [5, 29]], [[3, 30], [4, 30]]];
    let y = [[[2, 33], [4, 33]], [[2, 36], [7,36]], [[5, 34], [5, 35]], [[8, 34], [8, 35]], [[7, 33], [7,33]]];
    let v = [[[11, 2], [15, 2]], [[11, 6], [15, 6]], [[16,3], [16, 3]] , [[16,5], [16, 5]], [[17, 4], [17, 4]]];
    let a2 = [[[12, 8], [17, 8]], [[12, 11], [17, 11]], [[11, 9], [11, 10]], [[15, 9], [15, 10]]];
    let l = [[[11, 13], [17, 13]], [[17, 14], [17, 16]]];
    let e1 = [[[11, 18], [17, 18]], [[11, 19], [11, 21]], [[14, 19], [14, 20]], [[17, 19], [17, 21]]];
    let n1 = [[[11, 23], [17, 23]], [[11, 26], [17, 26]], [[13, 24], [13, 24]], [[14, 25], [14, 25]]];
    let t = [[[11, 28], [11, 32]], [[12, 30], [17, 30]]];
    let i = [[[11, 34], [11, 36]], [[17, 34], [17, 36]], [[12, 35], [16, 35]]];
    let n2 = [[[11, 38], [17, 38]], [[11, 41], [17, 41]], [[13, 39], [13, 39]], [[14, 40], [14, 40]]];
    let e2 = [[[11, 43], [17, 43]], [[11, 44], [11, 46]], [[17, 44,], [17, 46]], [[14, 44], [14, 45]]];
    const letters = [h, a1, p1, p2, y, v, a2, l, e1, n1, t, i, n2, e2];
    for(let letter of letters){
      for(let line of letter){
        let p1 = new Pos(line[0][0], line[0][1]);
        let p2 = new Pos(line[1][0], line[1][1]);

        console.log(p1);
        if (p1.r == p2.r){
          for(let i = Math.min(p1.c, p2.c); i <= Math.max(p1.c, p2.c); i++){
            console.log("r-coord: "+p1.r+", "+i);
            this.board[p1.r][i].bomb = true;
            this.setNum(p1.r, i);
          }
        }
        else{
          for(let i = Math.min(p1.r, p2.r); i <= Math.max(p1.r, p2.r); i++){
            console.log("c-coord: "+p1.r+", "+i);
            this.board[i][p1.c].bomb = true;
            this.setNum(i, p1.c);
          }
        }
      }
    }
  }
  setBomb(n){
    for(let i=0; i < n; ){
      let randRow = Math.floor(Math.random()*this.row);
      let randCol = Math.floor(Math.random()*this.col);
      let tile = this.board[randRow][randCol];
      if(!tile.bomb){
        tile.bomb = true;
        this.setNum(randRow, randCol);
        i++;
      }
    }
  }
}

function getDiv(tile){
  return document.getElementById(tile.r + " " + tile.c);
}

function click(){
  let i, j;
  [i, j] = this.id.split(" ");
  console.log(i + " " + j);
  let queue = new Array();
  queue.push(grid.board[i][j]);
  curr++;
  let tile = queue[0];
  tile.val = tile.count == 0 ? " " : tile.count;
  getDiv(tile).style.backgroundColor = "lightgray";
  getDiv(tile).innerHTML = tile.val;

  while (queue.length > 0){
    tile = queue.pop()
    if (tile.bomb){
      alert("you lost");
      getDiv(tile).innerHTML = "X";
      break;
    }
    if (tile.count != 0) continue;
    let minR,maxR, minC, maxC;
    minR = tile.r - 1; minR = minR < 0 ? 0 : minR;
    maxR = tile.r + 2; maxR = maxR > grid.row ? grid.row : maxR;
    minC = tile.c - 1; minC = minC < 0 ? 0 : minC;
    maxC = tile.c + 2; maxC = maxC > grid.col ? grid.col : maxC;

    for(let i=minR; i<maxR;i++){
      for(let j=minC; j<maxC; j++){
        tempTile = grid.board[i][j];
        if(tempTile.val == 'X'){
          curr++;
          tempTile.val = tempTile.count == 0 ? " " : tempTile.count;
          getDiv(tempTile).style.backgroundColor = "lightgray";
          getDiv(tempTile).innerHTML = tempTile.val;
          queue.push(tempTile);
        }
      }
    }
  }
  console.log("total: " + total);
  console.log("curr: " + curr);
  if(total == curr){
    alert("you won");
  }
}

window.onload = function(){
  console.log("test");
  grid = new Grid(20, 50);
  // grid.setBomb(10);
  grid.drawBomb();
  total = 20 * 50 - 10; 
  console.log(grid.board[0][0].val);
  // console.log("tester");
  setGame();
}

function setGame(){
  for(let i=0 ; i < grid.row; i++){
    for(let j=0; j < grid.col; j++){
      let tile = document.createElement("div");
      tile.id = i + " " + j;
      tile.addEventListener("click", click);
      document.getElementById("board").appendChild(tile);
    }
  }
}


