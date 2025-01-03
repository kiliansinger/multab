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
document.getElementById("starttextmul").onclick = ()=>{start([["*",10],["/",10]],true)}
document.getElementById("starttextall").onclick = ()=>{start([["*",10],["/",10],["+",10],["-",10]],true)}
document.getElementById("check").onclick = check;
document.getElementById("update").onclick = update;
document.getElementById("print").onclick = printit;
addEventListener("DOMContentLoaded", (event) => {document.getElementById("startmul").click()});

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
    for(let i=0;i<op2.length;++i){
        op2[i].push(i);//put index into op2[i][2]
    }
   // if(text===undefined) text=false;
    if(text) document.getElementById("comment").innerText="Heute ist Drachengeburtstag. Aber was für ein Durcheinander. Sie muss die Kekse verteilen aber der Text hat Lücken. Fülle die Lücken aus.";
    else document.getElementById("comment").innerText="";
    let excercises=document.getElementById("excercises");
    let html="";//you cannot set innerHTML in a loop, when it is invalid
    html="<table>\n";
    let numbers=document.getElementById("range").value.match(/\d+/g);
    let range=document.getElementById("range").value.match(/\d+-\d+/g);
    console.log(range);
    console.log(numbers);
    if(numbers==null) numbers=[];
    let maxval=Math.max(...numbers);
    //maxval overrides op2[i][1]
    console.log(maxval);
    let defaultval=true;
    if(maxval>-Infinity){
        for(let i=0;i<op2.length;++i){
            op2[i][1]=maxval;
        }
        defaultval=false;
    }
    
    arr = new Array(op2.length);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(op2[i][1]);
        for (var j = 0; j < arr[i].length; j++) {
            arr[i][j]=new Array(op2[i][1]).fill(defaultval);
        }
    }
    for (var i = 0; i < arr.length; i++) {
       // for (var j = 0; j < arr[i].length; j++) {
            numbers?.forEach(el => {
                numbers?.forEach(el2 => {
                    if(el-1<op2[i][1]){
                        arr[i][el-1][el2-1]=true;
                        arr[i][el2-1][el-1]=true;
                    }
                });
            });
        //}
    }
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            range?.forEach(el => {
                let r=el.match(/\d+/g);
                if(r[0]<0) r[0]=0;
                if(r[1]>arr[i].length) r[1]=arr[i].length;
                for(let k=r[0];k<=r[1];++k){
                    if(k-1<op2[i][1]){
                        arr[i][k-1][j]=true;
                        arr[i][j][k-1]=true;
                    }
                }
            });
        }
    }
    
    for(let i=0;i<20;++i){
        html+="<tr>\n";
        outer:
        for(let j=0;j<(text?1:5);++j){  
            html+=`<td id=`+i+`_`+j+`>`;
            let op;
            let opindex,a,b;
            while(true){
                if(op2.length==0) break outer;
                opindex=Math.floor(Math.random()*op2.length);
                //todo do here some avoiding of completed arrays
                op=op2[opindex][0];
            
            
                let a2=generateNumber(0,arr[op2[opindex][2]]);
                a=wuerfle(a2);
                if(a==undefined) {
                    op2.splice(opindex, 1);
                    console.log("splice",op2);
                    continue;
                }
                let b2=generateNumber(a,arr[op2[opindex][2]]);

            
                b=wuerfle(b2);
                if(b==undefined){
                    op2.splice(opindex, 1);
                    console.log("splice",op2);
                    continue;
                }
                break;
            }

            if( ! arr[op2[opindex][2]][a-1][b-1]) html+="!";
            arr[op2[opindex][2]][a-1][b-1]=false;     
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
                                html+="Jeder der "+a+" Drachen bekommt "+b+` Kekse. Wie viel Kekse muss die Drachenmama kaufen? <!--`+a+`*`+b+`=x--><input type="number" id="" name="" min="1" max="100"/>`;
                                break;
                            case "+":
                                html+="Drache Susi bekommt "+a+" Kekse und Drache Frido bekommt "+b+` Kekse. Wie viel Kekse haben sie zusammen? <!--`+a+`+`+b+`=x--><input type="number" id="" name="" min="1" max="100"/>`;
                                break;
                            case "-":
                                html+="Mama kauft "+a+" Kekse. Drache Frido bekommt "+b+` Kekse. Wie viel Kekse hat Mama noch? <!--`+a+`-`+b+`=x--><input type="number" id="" name="" min="1" max="100"/>`;
                                break;g
                            case "/":
                                html+="Mama kauft "+a+" Kekse. Sie hat "+b+` Kinderdrachen bei der Geburtstagsparty. Wie viele Kekse bekommt jeder Kinderdrache? <!--`+a+`/`+b+`=x--><input type="number" id="" name="" min="1" max="100"/>`;
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
                            html+="Mama kauft "+a+" Kekse. Sie hat "+`<!--`+a+`/x=`+c+`--><input type="number" id="" name="" min="1" max="100"/> Kinderdrachen bei der Geburtstagsparty. Jeder Kinderdrache bekommt `+c+" Kekse.";
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
                            html+=`Mama kauft <!--x/`+b+`=`+c+`--><input type="number" id="" name="" min="1" max="100"/> Kekse. Sie hat `+b+` Kinderdrachen bei der Geburtstagsparty. Jeder Kinderdrache bekommt `+c+" Kekse.";
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