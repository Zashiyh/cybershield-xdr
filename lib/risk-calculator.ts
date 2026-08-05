export function calculateRisk(
  alerts:any[]
){

let score = 0;


alerts.forEach((alert)=>{


if(alert.severity==="CRITICAL"){

score += 40;

}

else if(alert.severity==="HIGH"){

score += 25;

}

else if(alert.severity==="MEDIUM"){

score += 10;

}

else{

score += 5;

}


});



if(score > 100){

score = 100;

}



let level = "LOW";


if(score >= 80){

level="CRITICAL";

}

else if(score >=50){

level="HIGH";

}

else if(score >=25){

level="MEDIUM";

}



return {

score,

level

};


}