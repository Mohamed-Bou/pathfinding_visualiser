class Node{
    constructor(i,j){
        this.distanceFromStart=Infinity; 
        this.f=Infinity;
        this.g=Infinity;
        this.i=i;
        this.j=j;
        this.neighbors=[];
        this.parent=null;
        this.isblocked=false;
        this.isvisited=false;
    }
}
class graph{
    constructor(ncolomns,nrows){
        this.ncolomns=ncolomns;
        this.nrows=nrows;
        this.Nodes=[];
        this.nodeblocked=[];
        for (let i=0;i<nrows;i++){
            let row=[]
            for (let j=0;j<ncolomns;j++){
                let l=new Node(i,j);
                row.push(l);
            }
            this.Nodes.push(row);
        }
    }
    //the neighbors of a node in this graph
    get_neighbors(node){
        let n=node.i;
        let p=node.j;
        if (p<ncolomns-1){
            if (!this.Nodes[n][p+1].isblocked){
                this.Nodes[n][p].neighbors.push(this.Nodes[n][p+1]);
            }
            
        }if (p>0){
            if (!this.Nodes[n][p-1].isblocked){
                this.Nodes[n][p].neighbors.push(this.Nodes[n][p-1]);
            }
        }if (n<nrows-1){
            if (!this.Nodes[n+1][p].isblocked){
                this.Nodes[n][p].neighbors.push(this.Nodes[n+1][p]);
            }
        }if (n>0){
            if (!this.Nodes[n-1][p].isblocked){
                this.Nodes[n][p].neighbors.push(this.Nodes[n-1][p]);
            }
        }
        
    }
    drawGrid(w,h) {         // the grid is the representation of the graph
        for (let x = 0; x <= w; x += 20) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            for (let y = 0; y <= h; y += 20) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
        }
        ctx.stroke();
    };
}

function areequale(node1,node2){
    if(node1.i==node2.i && node1.j==node2.j){
        return(true);
    }
    return(false);
}
//drawing functions
function drawrec(x,y,color){  // draw a rect 17*17 at the position (x,y)
    ctx.fillStyle=color;
    ctx.fillRect(y*20,x*20,17,17);
}
function draw_the_Path(listcoor){
    const n=listcoor.length;
    let i=0;
    if(n==0){
        alert("path not exsist");
    }
    else{
        for (i=1;i<n-1;i++){
            drawrec(listcoor[i][0],listcoor[i][1],"darkgoldenrod");
        }
    }
}