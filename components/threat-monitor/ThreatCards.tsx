"use client";

import {
  ShieldAlert,
  AlertTriangle,
  Activity,
  ShieldCheck
} from "lucide-react";


interface Props {

  data:{
    totalAlerts:number;
    totalIncidents:number;
    critical:number;
    resolved:number;
  }

}


export default function ThreatCards({
  data
}:Props){


const cards = [

{
 title:"Total Alerts",
 value:data.totalAlerts,
 icon:ShieldAlert,
 color:"text-red-400"
},

{
 title:"Active Incidents",
 value:data.totalIncidents,
 icon:Activity,
 color:"text-yellow-400"
},

{
 title:"Critical Threats",
 value:data.critical,
 icon:AlertTriangle,
 color:"text-orange-400"
},

{
 title:"Resolved",
 value:data.resolved,
 icon:ShieldCheck,
 color:"text-green-400"
}

];



return (

<div className="
grid
gap-6
md:grid-cols-4
">


{
cards.map((card)=>(


<div

key={card.title}

className="
rounded-2xl
border
border-slate-800
bg-black
p-6
"

>


<div className="
flex
items-center
justify-between
">


<div>


<p className="
text-sm
text-slate-400
">

{card.title}

</p>


<h2 className="
mt-3
text-4xl
font-bold
text-white
">

{card.value}

</h2>


</div>


<card.icon

size={35}

className={card.color}

/>


</div>


</div>


))

}


</div>

);


}