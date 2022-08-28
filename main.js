const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

w=20*40;
h=20*30;

canvas.width=w;
canvas.height=h;

////// create the grid
//in UI
let ncolomns=w/20,nrows=h/20;
var graph1=new graph(ncolomns,nrows);
graph1.drawGrid(w,h);

// 
///////// chose start and end point and walls:
let start=[0,0];
let end=[0,0];
//
let chose_wall=false;
// helper funs.
function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left; 
    let y = event.clientY - rect.top; 
    return([x,y]);
} 
// start
const startp=document.getElementById('startpoint');
startp.addEventListener('click',function(){
    chose_wall=false;
    canvas.addEventListener("click", function(e) { 
    let l=getMousePosition(canvas, e); 
    ctx.fillStyle="green";
    ctx.fillRect(Math.floor(l[0]/20)*20,Math.floor(l[1]/20)*20,20,20);

    //update start
    ctx.fillStyle="rgb(194, 212, 206)";
    ctx.fillRect(start[1]*20,start[0]*20,20,20);
    
    start[0]=Math.floor(l[1]/20);
    start[1]=Math.floor(l[0]/20);
   
    },{once:true}); 
})
//end 
const endp=document.getElementById('endp');
endp.addEventListener('click',function (){
    chose_wall=false;
    canvas.addEventListener("click", function(e) { 
    let l=getMousePosition(canvas, e); 
    ctx.fillStyle="red";
    ctx.fillRect(Math.floor(l[0]/20)*20,Math.floor(l[1]/20)*20,20,20);   

    ctx.fillStyle="rgb(194, 212, 206)";
    ctx.fillRect(end[1]*20,end[0]*20,20,20);
    
    end[0]=Math.floor(l[1]/20);
    end[1]=Math.floor(l[0]/20);
    
    },{once:true}); 
});
///// creating walls.
$("#choosewall").click(function(){
    chose_wall=true;
})
let n=0;
canvas.addEventListener('click',function(){
    canvas.addEventListener('mousemove', (e) => {
        if (chose_wall && n%2==0){
            const rect = canvas.getBoundingClientRect();
            const X = e.clientX - rect.left;
            const Y = e.clientY - rect.top;
            const i=Math.floor(Y/20);
            const j=Math.floor(X/20);
           
            ctx.fillStyle='black';
            ctx.fillRect(20*j,20*i,20,20);
            graph1.Nodes[i][j].isblocked=true;
            
        }
    })
    n++;
})

/// chose alg
let alg="bfs";

//helper fun
function clear_previous_vis(graph){
    for (let i=0;i<graph.nrows;i++){
        for(let j=0;j<graph.ncolomns;j++){
            if (!graph.Nodes[i][j].isblocked){
                if((graph.Nodes[i][j].j!=start[1] || graph.Nodes[i][j].i!=start[0]) && (graph.Nodes[i][j].j!=end[1] || graph.Nodes[i][j].i!=end[0])){
                    drawrec(i,j,"rgb(194, 212, 206)");
                }
                else if(graph.Nodes[i][j].j==start[1] && graph.Nodes[i][j].i==start[0]){
                    drawrec(i,j,"green");
                }else{
                    drawrec(i,j,"red");
                }
                
            }
            graph.Nodes[i][j].parent=null;
            graph.Nodes[i][j].isvisited=false;
            graph.Nodes[i][j].distanceFromStart=Infinity;
            graph.Nodes[i][j].f=Infinity;
            graph.Nodes[i][j].g=Infinity;
        }
    }
}

// alg
$("#dijkstra").click(function(){
    clear_previous_vis(graph1);
    alg="dijkstra";
})
$("#bfs").click(function(){
    clear_previous_vis(graph1);
    alg="bfs";
})
$("#a_star").click(function(){
    clear_previous_vis(graph1);
    alg="a_star";
})
$("#bi_bfs").click(function(){
    clear_previous_vis(graph1);
    alg="bi_bfs";
})


///// start visualisation 

$("#startvis").click(function(){  
    const startnode=graph1.Nodes[start[0]][start[1]];
    const endnode=graph1.Nodes[end[0]][end[1]];
    if (alg=="bfs"){
        bfs(startnode,endnode,graph1);
    }
    else if(alg=="dijkstra"){
        dijikstra(startnode,endnode,graph1);
    }
    else if(alg=="a_star"){
        a_star(startnode,endnode,graph1);
    }
    else if(alg=="bi_bfs"){
        bi_bfs(startnode,endnode,graph1);
    }
 })
 $("#refrech").click(function(){
    location.reload();
})