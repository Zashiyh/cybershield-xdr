"use client";

import {
  useEffect,
  useState
} from "react";


import {
  Cpu,
  Database,
  Globe,
  Server,
  Activity,
  ShieldCheck,
  Lock
} from "lucide-react";




interface HealthData {

  status:string;

  database:string;

  api:string;

  uptime:string;

  cpu:number;

  memory:number;

  threatEngine:string;

  alertProcessor:string;

  geoService:string;

  auth:string;

}






export default function HealthCard(){



const [health,setHealth] =
useState<HealthData | null>(null);





async function loadHealth(){


try{


const res =
await fetch(

"/api/security/health",

{
cache:"no-store"
}

);



const data =
await res.json();



setHealth(data);



}

catch(error){

console.log(
"HEALTH ERROR",
error
);

}


}







useEffect(()=>{


loadHealth();



const timer =
setInterval(

loadHealth,

5000

);



return()=>clearInterval(timer);



},[]);









function getStatusColor(value:number){


if(value >= 86){

return {

text:"text-red-400",

bg:"bg-red-500",

status:"Critical"

};

}



if(value >= 71){


return {

text:"text-yellow-400",

bg:"bg-yellow-500",

status:"Warning"

};


}



return {

text:"text-green-400",

bg:"bg-green-500",

status:"Normal"

};


}








if(!health){


return (

<div className="text-white">

Loading System Health...

</div>

);


}








const cpuStatus =
getStatusColor(
health.cpu
);



const memoryStatus =
getStatusColor(
health.memory
);







const systems=[



{

name:"CPU Usage",

value:`${health.cpu}%`,

status:cpuStatus.status,

progress:health.cpu,

color:cpuStatus.bg,

icon:Cpu

},





{

name:"Memory Usage",

value:`${health.memory}%`,

status:memoryStatus.status,

progress:health.memory,

color:memoryStatus.bg,

icon:Server

},






{

name:"Network",

value:"Online",

status:"Healthy",

icon:Globe

},






{

name:"Database",

value:health.database,

status:
health.database==="Connected"
?
"Healthy"
:
"Down",

icon:Database

},






{

name:"API Service",

value:health.api,

status:"Operational",

icon:Activity

},






{

name:"Threat Engine",

value:health.threatEngine,

status:"Active",

icon:ShieldCheck

},






{

name:"Alert Processor",

value:health.alertProcessor,

status:"Running",

icon:Activity

},






{

name:"Geo Location Service",

value:health.geoService,

status:"Online",

icon:Globe

},






{

name:"Authentication",

value:health.auth,

status:"Secure",

icon:Lock

},






{

name:"Uptime",

value:health.uptime,

status:"Running",

icon:Activity

}





];









return (

<div

className="
rounded-2xl
border
border-slate-800
bg-[#0f172a]
p-6
"

>





<div className="mb-6">


<h2

className="
text-xl
font-bold
text-white
"

>

System Health Monitor

</h2>



<p

className="
text-sm
text-slate-400
"

>

Real-time platform status

</p>


</div>









<div className="space-y-4">


{


systems.map(

(system,index)=>{


const Icon =
system.icon;



const danger =

system.status==="Critical"

||
system.status==="Warning"

||
system.status==="Down";





return (



<div

key={index}

className="
rounded-xl
bg-slate-900
p-4
"

>





<div

className="
flex
items-center
justify-between
"

>





<div

className="
flex
items-center
gap-4
"

>



<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-lg
bg-cyan-500/10
"

>


<Icon

size={22}

className="text-cyan-400"

/>



</div>







<div>


<p

className="
text-white
font-medium
"

>

{system.name}

</p>



<p

className="
text-sm
text-slate-400
"

>

{system.value}

</p>




</div>






</div>







<span

className={`
rounded-full
px-3
py-1
text-xs
font-bold

${
danger
?
"bg-red-500/20 text-red-400"
:
"bg-green-500/20 text-green-400"
}

`}

>

{system.status}

</span>





</div>









{

system.progress !== undefined &&

(

<div

className="
mt-3
h-2
w-full
overflow-hidden
rounded-full
bg-slate-700
"

>


<div

className={`
h-full
transition-all
duration-500
${system.color}
`}

style={{

width:`${system.progress}%`

}}


/>


</div>

)

}








</div>



);


}

)


}



</div>







</div>


);


}