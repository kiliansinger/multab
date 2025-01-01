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
            for(let i=1;i<arr[0].length;i++){
                boolarray[i]|=arr[i][j];
            }
        }
    }else{//num=1 means second multiplier
        for(let i=0;i<arr[0].length;i++){
            boolarray.push(arr[0][i]);
        }
        for(let j=1;j<arr.length;j++){
            for(let i=1;i<arr[0].length;i++){
                boolarray[i]|=arr[j][i];
            }
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

document.getElementById("start").onclick = start;
document.getElementById("check").onclick = check;

async function start(){
    let excercises=document.getElementById("excercises");
    let html="";//you cannot set innerHTML in a loop, when it is invalid
    html="<table>\n";
   
    var arr = new Array(10);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(10).fill(true);
    }
  
    for(let i=0;i<20;++i){
        html+="<tr>\n";
        for(let j=0;j<5;++j){
            html+=`<td id=`+i+`_`+j+`>`;
            while(true){
                let a2=generateNumber(0,arr);
                let b2=generateNumber(1,arr);

                let a=wuerfle(a2);
                let b=wuerfle(b2);
                if(a==undefined||b==undefined){
                    break;
                }
                if( ! arr[a-1][b-1]) continue;
                arr[a-1][b-1]=false;           
                
                let c=a*b
                let type=Math.floor(Math.random()*3);
            // type=0;
                switch(type){
                    case 0:
                        html+=a+"*"+b+`= <input type="number" id="" name="" min="1" max="100"/>`;
                        break;
                    case 1:
                        html+=a+`*<input type="number" id="" name="" min="1" max="100"/>=`+c;
                        break;
                    case 2:
                        html+=`<input type="number" id="" name="" min="1" max="100"/>*`+b+"="+c;
                        break;
                }
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
            let html=td.innerText.trim();
            let check="";
            if(html.startsWith("*")){
                check=input.value+html;
            }
            else if(html.endsWith("=")){
                check=html+input.value;
            }
            else{
                let parts=html.split("*");
                let parts2=html.split("=");
                check=parts[0]+"*"+input.value+"="+parts2[1];

            }
    

            //console.log(html+"???"+check);
            check=check.replaceAll("=","==");
            try{
                if(eval(check)){
                    td.style.backgroundColor="lightgreen";
                }else{
                    td.style.backgroundColor="red";
                }
            }
            catch(err){
                td.style.backgroundColor="white";
            }
        }
        
    }
}