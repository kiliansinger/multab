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


document.getElementById("startadd").onclick = ()=>{start([["+",10]])};
document.getElementById("startadd2").onclick = ()=>{start([["+",100]])};
document.getElementById("startsub").onclick = ()=>{start([["-",10]])};
document.getElementById("startsub2").onclick = ()=>{start([["-",100]])};
document.getElementById("startaddsub2").onclick = ()=>{start([["+",100],["-",100]])};
document.getElementById("startmul").onclick = ()=>{start([["*",10]])};
document.getElementById("startdiv").onclick = ()=>{start([["/",10]])};
document.getElementById("startmuldiv").onclick = ()=>{start([["*",10],["/",10]])};
document.getElementById("startall").onclick = ()=>{start([["*",10],["/",10],["+",100],["-",100]])};
document.getElementById("starttext").onclick = ()=>{start([["*",10],["/",10],["+",10],["-",10]],true)}
document.getElementById("check").onclick = check;
document.getElementById("update").onclick = update;
document.getElementById("print").onclick = printit;
addEventListener("DOMContentLoaded", (event) => {document.getElementById("starttext").click()});

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
let arr;
async function start(op2,text=false){
   // if(text===undefined) text=false;
    if(text) document.getElementById("comment").innerText="Heute ist Drachengeburtstag. Aber was für ein Durcheinander. Sie muss die Kekse verteilen aber der Text hat Lücken. Fülle Sie aus.";
    else document.getElementById("comment").innerText="";
    let excercises=document.getElementById("excercises");
    let html="";//you cannot set innerHTML in a loop, when it is invalid
    html="<table>\n";
    
    arr = new Array(op2.length);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(op2[i][1]);
        for (var j = 0; j < arr[i].length; j++) {
            arr[i][j]=new Array(op2[i][1]).fill(true);
        }
    }
  
    for(let i=0;i<20;++i){
        html+="<tr>\n";
        outer:
        for(let j=0;j<(text?1:5);++j){  
            html+=`<td id=`+i+`_`+j+`>`;
            let op;
            let opindex=Math.floor(Math.random()*op2.length);
  
            op=op2[opindex][0];
          
           
            let a2=generateNumber(0,arr[opindex]);
            let a=wuerfle(a2);
            if(a==undefined) break outer;
            let b2=generateNumber(a,arr[opindex]);

          
            let b=wuerfle(b2);
            if(b==undefined){
                break outer;
            }
            if( ! arr[opindex][a-1][b-1]) html+="!";
            arr[opindex][a-1][b-1]=false;     
            let c;      
            //check if type of op is array
        

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
            if(text){
                switch(type){
                    case 0://letztes ffeld input
                        switch(op){
                            case "*":
                                html+="Jeder der "+a+" Drachen bekommt "+b+` Kekse. Wieviel Kekse muss die Drachenmama kaufen? <!--`+a+`*`+b+`=x--><input type="number" id="" name="" min="1" max="100"/>`;
                                break;
                            case "+":
                                html+="Drache Susi bekommt "+a+" Kekse und Drache Frido bekommt "+b+` Kekse. Wieviel Kekse haben sie zusammen? <!--`+a+`+`+b+`=x--><input type="number" id="" name="" min="1" max="100"/>`;
                                break;
                            case "-":
                                html+="Mama kauft "+a+" Kekse. Drache Frido bekommt "+b+` Kekse. Wieviel Kekse hat Mama noch? <!--`+a+`-`+b+`=x--><input type="number" id="" name="" min="1" max="100"/>`;
                                break;
                            case "/":
                                html+="Mama kauft "+a+" Kekse. Sie hat "+b+` Kinderdrachen bei der Geburtstagsparty. Wieviele Kekse bekommt jeder Kinderdrachen? <!--`+a+`/`+b+`=x--><input type="number" id="" name="" min="1" max="100"/>`;
                                break;
                        }
                        break;
                    case 1://zweites feld input
                    switch(op){
                        case "*":
                            html+="Jeder der "+a+" Drachen bekommt "+`<!--`+a+`*x`+`=`+c+`--><input type="number" id="" name="" min="1" max="100"/> Kekse. Die Drachenmama kauft `+c+` Kekse.`;
                            break;
                        case "+":
                            html+="Drache Susi bekommt "+a+" Kekse und Drache Frido bekommt "+`<!--`+a+`+x=`+c+`--><input type="number" id="" name="" min="1" max="100"/> Kekse. Sie haben zusammen `+c+` Kekse.`;
                            break;
                        case "-":
                            html+="Mama kauft "+a+" Kekse. Drache Frido bekommt "+`<!--`+a+`-x=`+c+`--><input type="number" id="" name="" min="1" max="100"/> Kekse. Mama hat noch `+c+` Kekse.`;
                            break;
                        case "/":
                            html+="Mama kauft "+a+" Kekse. Sie hat "+`<!--`+a+`/x=`+c+`--><input type="number" id="" name="" min="1" max="100"/> Kinderdrachen bei der Geburtstagsparty. Jeder Kinderdrachen bekommt `+c+" Kekse.";
                            break;
                    }
                    break;
                case 2://erstes feld input
                    switch(op){
                        case "*":
                            html+=`Jeder der <!--x*`+b+`=`+c+`--><input type="number" id="" name="" min="1" max="100"/> Drachen bekommt `+b+` Kekse. Die Drachenmama kauft `+c+` Kekse.`;
                            break;
                        case "+":
                            html+=`Drache Susi bekommt <!--x+`+b+`=`+c+`--><input type="number" id="" name="" min="1" max="100"/> Kekse und Drache Frido bekommt `+b+` Kekse. Sie haben zusammen `+c+` Kekse.`;
                            break;
                        case "-":
                            html+=`Mama kauft <!--x-`+b+`=`+c+`--><input type="number" id="" name="" min="1" max="100"/> Kekse. Drache Frido bekommt `+b+` Kekse. Mama hat noch `+c+` Kekse.`;
                            break;
                        case "/":
                            html+=`Mama kauft <!--x/`+b+`=`+c+`--><input type="number" id="" name="" min="1" max="100"/>. Sie hat `+b+` Kinderdrachen bei der Geburtstagsparty. Jeder Kinderdrachen bekommt `+c+" Kekse.";
                            break;
                    }
                    break;
                }

            }else{
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
            if(td===null) continue;
            let input=td.getElementsByTagName("input")[0];
            if(input===undefined){//we have empty table element
                continue;
            }
            if(input.value=="") {
                td.style.backgroundColor="white";
                continue;
            }
            let html=td.innerHTML.trim();
            let check=html
            if(html.match(/<!--/)){
                check=html.replace(/.*<!--/,"");
                check=check.replace(/-->.*/,"");
                check=check.replace(/x/,input.value);
            }
            else check=check.replace(/<.*>/,input.value);

            check=check.replaceAll("=","==");
            console.log(check)
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