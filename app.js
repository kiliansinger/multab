function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
    
function generateNumber(num,arr){
    let ziffernarray=[];
    let boolarray=[]
    if(num==0){//num=0 means first multiplier
        for(let i=0;i<arr.length;i++){
            boolarray.push(arr[i][0]);
        }
        for(let j=1;j<arr[0].length;j++){
            for(let i=0;i<arr.length;i++){
                boolarray[i]|=arr[i][j];
            }
        }
    }else{//num=>1 means we copy
        for(let i=0;i<arr[0].length;i++){
            boolarray.push(arr[num-1][i]);
        }
    }



    for(let i=0;i<boolarray.length;i++){
        if(boolarray[i]){
            ziffernarray.push(i+1);
        }
    }
    return ziffernarray
}

function wuerfle(ziffernarray){
    let index=Math.floor(Math.random()*ziffernarray.length);
    return ziffernarray[index];
}


document.getElementById("startadd").onclick = ()=>{start("+",10)};
document.getElementById("startadd2").onclick = ()=>{start("+",100)};
document.getElementById("startsub").onclick = ()=>{start("-",10)};
document.getElementById("startsub2").onclick = ()=>{start("-",100)};
document.getElementById("startaddsub2").onclick = ()=>{start(["+","-"],100)};
document.getElementById("startmul").onclick = ()=>{start("*",10)};
document.getElementById("startdiv").onclick = ()=>{start("/",10)};
document.getElementById("startmuldiv").onclick = ()=>{start(["*","/"],10)};
document.getElementById("startall").onclick = ()=>{start(["*","/","+","-"],10)};
document.getElementById("check").onclick = check;
document.getElementById("update").onclick = update;
document.getElementById("print").onclick = printit;
addEventListener("DOMContentLoaded", (event) => {start("*",10);});

function printit(){
    window.print();
}
function update(){
    navigator.serviceWorker.getRegistration().then(function(reg) {
    if (reg) {
      reg.unregister().then(function() { window.location.reload(true); });
    } else {
       window.location.reload(true);
    }
  });
}

async function start(op2,max){
    let excercises=document.getElementById("excercises");
    let html="";//you cannot set innerHTML in a loop, when it is invalid
    html="<table>\n";
   
    var arr = new Array(max);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(max).fill(true);
    }
  
    for(let i=0;i<20;++i){
        html+="<tr>\n";
        outer:
        for(let j=0;j<5;++j){  
            html+=`<td id=`+i+`_`+j+`>`;
           
            let a2=generateNumber(0,arr);
            let a=wuerfle(a2);
            if(a==undefined) break outer;
            let b2=generateNumber(a,arr);

          
            let b=wuerfle(b2);
            if(b==undefined){
                break outer;
            }
            if( ! arr[a-1][b-1]) html+="!";
            arr[a-1][b-1]=false;     
            let c;      
            //check if type of op is array
            let op;
            if(Array.isArray(op2)){
                let index=Math.floor(Math.random()*op2.length);
                op=op2[index];
            }else{
                op=op2;
            }

            switch(op){
                case "+":
                    c=a+b;
                    break;
                case "*":
                    c=a*b
                    break;
                case "-":
                    if(a<b){
                        let temp=a;
                        a=b;
                        b=temp;
                    }
                    c=a-b;
                    break;
                case "/": 
                    c=a*b;
                    let temp=a;
                    a=c;
                    c=temp;
                    break;
            }
      
            let type=Math.floor(Math.random()*3);
        // type=0;
            
            switch(type){
                case 0:
                    html+=""+a+op+b+`= <input type="number" id="" name="" min="1" max="100"/>`;
                    break;
                case 1:
                    html+=""+a+op+`<input type="number" id="" name="" min="1" max="100"/>=`+c;
                    break;
                case 2:
                    html+=`<input type="number" id="" name="" min="1" max="100"/>`+op+b+"="+c;
                    break;
            }

            html+="</td>";
        }
        html+="</tr>\n";
    }
    excercises.innerHTML=html;
}


async function check(){
    for(let i=0;i<20;++i){
        for(let j=0;j<5;++j){
            let td=document.getElementById(i+"_"+j);
            if(td===undefined) continue;
            let input=td.getElementsByTagName("input")[0];
            if(input.value=="") {
                td.style.backgroundColor="white";
                continue;
            }
            let html=td.innerHTML.trim();
            let check=html.replace(/<.*>/,input.value);

            check=check.replaceAll("=","==");
            try{
                if(eval(check)){
                    if(td.style.backgroundColor=="pink" || td.style.backgroundColor=="lightblue" )
                        td.style.backgroundColor="lightblue";
                    else td.style.backgroundColor="lightgreen";
                }else{
                    td.style.backgroundColor="pink";
                }
            }
            catch(err){
                td.style.backgroundColor="white";
            }
        }
        
    }
}