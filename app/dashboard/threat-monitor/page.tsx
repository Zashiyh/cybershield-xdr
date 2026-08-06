"use client";


import {
  useEffect,
  useState
} from "react";


import ThreatCards from "@/components/threat-monitor/ThreatCards";
import LiveFeed from "@/components/threat-monitor/LiveFeed";
import RecentEvents from "@/components/threat-monitor/RecentEvents";
import AttackMap from "@/components/threat-monitor/AttackMap";
import LiveAttackFeed from "@/components/threat-monitor/LiveAttackFeed";





export interface ThreatData {


  totalAlerts:number;


  totalIncidents:number;


  critical:number;


  resolved:number;


  alerts:any[];


  incidents:any[];


}









export default function ThreatMonitorPage(){



const [data,setData] =

useState<ThreatData | null>(null);




const [loading,setLoading] =

useState(true);







async function loadData(){


try{



const res =

await fetch(

"/api/security/threat-monitor",

{

cache:"no-store"

}

);





const json =

await res.json();





setData(json);




}


catch(error){


console.log(

"THREAT MONITOR ERROR:",

error

);


}



finally{


setLoading(false);


}



}









useEffect(()=>{


loadData();





const interval =

setInterval(

loadData,

5000

);





return()=>clearInterval(interval);



},[]);












if(loading){


return (

<div className="
text-white
text-xl
p-10
">

Loading Threat Monitor...

</div>

);


}









if(!data){


return (

<div className="
text-red-400
p-10
">

Failed to load threat monitor.

</div>

);


}












return (


<div className="
space-y-8
">






{/* Header */}


<div>


<h1 className="
text-4xl
font-bold
text-white
">

Threat Monitor

</h1>



<p className="
mt-2
text-slate-400
">

Live Security Operations Center

</p>



</div>









{/* Statistics */}


<ThreatCards

data={data}

/>









{/* Map + Live Attack Feed */}



<div className="
grid
lg:grid-cols-2
gap-6
">





<AttackMap />





<LiveAttackFeed />





</div>









{/* Existing Security Feeds */}



<div className="
grid
lg:grid-cols-2
gap-6
">






<LiveFeed

alerts={data.alerts}

/>






<RecentEvents

incidents={data.incidents}

/>






</div>








</div>



);


}