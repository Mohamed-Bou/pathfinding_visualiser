/// breath first search
function bfs(startnode,endnode,graph1){
    let path=[];
    let isdisplyed=false;    // "path not found" s'il n'est pas de chemin de start a end.
    const queue=[startnode];
    function update(){
        if (queue.length!=0){
             const curr_node=queue.shift();
             if(!curr_node.isvisited && !curr_node.isblocked){
                curr_node.isvisited=true;
                if (areequale(curr_node,endnode)){
                    let p=curr_node;
                    while(p){
                        path.unshift([p.i,p.j]);
                        p=p.parent;
                    }
                }
                else{
                    if(!areequale(curr_node,startnode)){
                        drawrec(curr_node.i,curr_node.j,"rgb(52, 154, 194)");
                    }
                    graph1.get_neighbors(curr_node);
                    const curr_nodeNeighbors=graph1.Nodes[curr_node.i][curr_node.j].neighbors;
                    for (let j=0;j<curr_nodeNeighbors.length;j++){
                        if(!curr_nodeNeighbors[j].isvisited && !curr_nodeNeighbors[j].isblocked){
                          curr_nodeNeighbors[j].parent=curr_node;
                          drawrec(curr_nodeNeighbors[j].i,curr_nodeNeighbors[j].j,"white");
                          queue.push(curr_nodeNeighbors[j]); 
                        }
                        
                    }
                }
            }        
        }
        // when we found the path the animation stop
        if(path.length==0){
            requestAnimationFrame(update);
            if (queue.length==0 && isdisplyed==false){
                alert("path not found");
                isdisplyed=true;
            }
        }else{
         draw_the_Path(path);
         drawrec(endnode.i,endnode.j,"red");

        }
        
    }
    update();
 }

function index(v,node){
    for(let i=0;i<v.length;i++){
        if(areequale(v[i],node)) return(i);
    }
    return(-1);
}
 // bi_bfs alg
 function bi_bfs(startnode,endnode,graph1){
    let path=[];
    let path1=[];
    let isdisplyed=false;    // "path not found" s'il n'est pas de chemin de start a end.
    const queue=[startnode];
    const queue1=[endnode];
    function update(){
        if (queue.length!=0 && queue1.length!=0){
             const curr_node=queue.shift();
             const curr_node1=queue1.shift();
             if(!curr_node.isvisited && !curr_node.isblocked && !curr_node1.isvisited && !curr_node1.isblocked){
                curr_node.isvisited=true;
                curr_node1.isvisited=true;
                
                    if(!areequale(curr_node,startnode)){
                        drawrec(curr_node.i,curr_node.j,"rgb(52, 154, 194)");
                    }
                    if(!areequale(curr_node1,endnode)){
                        drawrec(curr_node1.i,curr_node1.j,"rgb(52, 154, 194)");
                    }
                    graph1.get_neighbors(curr_node);
                    graph1.get_neighbors(curr_node1);
                    const curr_nodeNeighbors1=graph1.Nodes[curr_node1.i][curr_node1.j].neighbors;
                    const curr_nodeNeighbors=graph1.Nodes[curr_node.i][curr_node.j].neighbors;
                    for (let j=0;j<curr_nodeNeighbors.length;j++){
                        if(!curr_nodeNeighbors[j].isvisited && !curr_nodeNeighbors[j].isblocked){
                          curr_nodeNeighbors[j].parent=curr_node;
                          drawrec(curr_nodeNeighbors[j].i,curr_nodeNeighbors[j].j,"white");
                          queue.push(curr_nodeNeighbors[j]); 
                        }
                    }
                    for (let j=0;j<curr_nodeNeighbors1.length;j++){
                        if(!curr_nodeNeighbors1[j].isvisited && !curr_nodeNeighbors1[j].isblocked){
                            if(index(queue,curr_nodeNeighbors1[j])!=-1){
                                let p=curr_node1;
                                let p1=curr_nodeNeighbors1[j];
                                while(p){
                                    path.unshift([p.i,p.j]);
                                    p=p.parent;
                                }
                                while(p1){
                                    path.unshift([p1.i,p1.j]);
                                    p1=p1.parent;
                                }
                            }
                            curr_nodeNeighbors1[j].parent=curr_node1;
                            drawrec(curr_nodeNeighbors1[j].i,curr_nodeNeighbors1[j].j,"white");
                            queue1.push(curr_nodeNeighbors1[j]); 
                        }
                    }
                }  
        }
        // when we found the path the animation stop
        if(path.length==0){
            requestAnimationFrame(update);
            if (queue.length==0 && isdisplyed==false){
                alert("path not found");
                isdisplyed=true;
            }
        }else{
         draw_the_Path(path);
        // draw_the_Path(path1);
        }
    }
    update();
 }

 function dijikstra(startnode,endnode,graph){
     let path=[];
     let isdisplyed=false;
     startnode.distanceFromStart=0;
     let q=[];
    
     for(let i=0;i<graph.Nodes.length;i++){
        for(let j=0;j<graph.Nodes[0].length;j++){
            q.push(graph.Nodes[i][j]);
         }
     }
     function update(){
         if(q.length!=0){
            let curr_node;
            q.sort((n1, n2) => n1.distanceFromStart - n2.distanceFromStart)
            curr_node=q.shift();
            while(curr_node.isblocked) curr_node=q.shift();
            drawrec(curr_node.i,curr_node.j,"rgb(52, 154, 194)");
            curr_node.isvisited=true;
            if(areequale(curr_node,endnode)){
                let p=curr_node;
                while(p){
                    path.unshift([p.i,p.j]);
                    p=p.parent;
                }
            }
            graph1.get_neighbors(curr_node);
            const curr_nodeNeighbors=graph.Nodes[curr_node.i][curr_node.j].neighbors;
            for (let j=0;j<curr_nodeNeighbors.length;j++){
                let a=curr_node.distanceFromStart+1;
                if(a<curr_nodeNeighbors[j].distanceFromStart){
                    curr_nodeNeighbors[j].distanceFromStart=a;
                    curr_nodeNeighbors[j].parent=curr_node;
                }
                if(!curr_nodeNeighbors[j].isblocked && !curr_nodeNeighbors[j].isvisited) drawrec(curr_nodeNeighbors[j].i,curr_nodeNeighbors[j].j,"white");
            }
         }
         // when we found the path the animation stop
        if(path.length==0){
            requestAnimationFrame(update);
            if (q.length==0 && isdisplyed==false){
                alert("path not found");
                isdisplyed=true;
            }
        }else{
            draw_the_Path(path);
            drawrec(endnode.i,endnode.j,"red");
        }
     }
     update();
 }

 // A* alg
 function h(node1,node2){
     return(Math.abs(node1.i-node2.i)+Math.abs(node1.j-node2.j));
 }
 function a_star(startnode,endnode,graph){
    let path=[];
    let isdisplyed=false;
    let openList   = [];
    let  closedList = [];
    openList.push(startnode);
    startnode.g=0;
    startnode.f=h(startnode,endnode);
    function update(){
        if(openList.length>0){
            openList.sort((n1, n2) => n1.f - n2.f)
            curr_node=openList.shift();
            while(curr_node.isblocked) curr_node=openList.shift();
            drawrec(curr_node.i,curr_node.j,"rgb(52, 154, 194)");
            //si on trouve le chemin 
            if(areequale(curr_node,endnode)){
                let p=curr_node;
                while(p){
                    path.unshift([p.i,p.j]);
                    p=p.parent;
                }
            }
            closedList.push(curr_node);

            graph.get_neighbors(curr_node);
            const curr_nodeNeighbors=graph.Nodes[curr_node.i][curr_node.j].neighbors;
            for(var i=0;i<curr_nodeNeighbors.length;i++){
                let neighbor=curr_nodeNeighbors[i];
                let a=curr_node.g+1;
                if(a<neighbor.g){
                    neighbor.parent=curr_node;
                    neighbor.g=a;
                    neighbor.f=a+h(neighbor,endnode);
                    if(!openList.includes(neighbor)){
                         openList.push(neighbor);
                         drawrec(neighbor.i,neighbor.j,"white");
                    }
                }

            }
        }
        // when we found the path the animation stop
        if(path.length==0){
            requestAnimationFrame(update);
            if (openList.length==0 && isdisplyed==false){
                alert("path not found");
                isdisplyed=true;
            }
        }else{
            draw_the_Path(path);
            drawrec(endnode.i,endnode.j,"red");
        }
    }
    update();


 }