"use client";

import {
  useEffect,
  useState
} from "react";


import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";



interface AttackLocation {

  ip:string;

  title:string;

  severity:string;

  lat:number;

  lng:number;

  country:string;

  city:string;

  targetLat:number;

  targetLng:number;

}



const geoUrl =
"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";



const SOC_LOCATION = {

  lat:6.9271,

  lng:79.8612

};





export default function AttackMap(){


const [attacks,setAttacks] =
useState<AttackLocation[]>([]);


const [loading,setLoading] =
useState(true);



const [selectedAttack,setSelectedAttack] =
useState<AttackLocation | null>(null);







useEffect(()=>{

loadAttackLocations();

},[]);








async function loadAttackLocations(){


try{


const res =
await fetch(

"/api/security/alerts",

{
cache:"no-store"
}

);



const alerts =
await res.json();




if(!Array.isArray(alerts)){

setLoading(false);

return;

}





const locations =

await Promise.all(


alerts
.slice(0,10)
.map(

async(alert:any)=>{


try{


const geoRes =
await fetch(

`/api/security/geo?ip=${alert.ip}`

);



const geo =
await geoRes.json();




return {


ip:alert.ip,


title:alert.title,


severity:alert.severity,



lat:Number(geo.lat) || 0,


lng:Number(geo.lng) || 0,



country:geo.country || "Unknown",


city:geo.city || "Unknown",



targetLat:SOC_LOCATION.lat,


targetLng:SOC_LOCATION.lng


};



}

catch(err){


console.log(err);


return null;


}


}


)

);







const filtered =

locations.filter(

(item):

item is AttackLocation =>

item !== null

);




setAttacks(filtered);



}

catch(err){

console.log(
"ATTACK MAP ERROR",
err
);

}

finally{

setLoading(false);

}



}









if(loading){

return (

<div className="
rounded-2xl
border
border-slate-800
bg-black
p-6
text-white
">

Loading Attack Map...

</div>

);

}










return (

<div className="
rounded-2xl
border
border-slate-800
bg-black
p-6
">



<h2 className="
text-xl
font-bold
text-white
mb-5
">

🌍 Live Attack Map

</h2>







<ComposableMap

projectionConfig={{

scale:140

}}

>





<Geographies geography={geoUrl}>


{({geographies}:any)=>(


geographies.map((geo:any)=>(


<Geography

key={geo.rsmKey}

geography={geo}

style={{

default:{

fill:"#1e293b",

outline:"none"

},

hover:{

fill:"#334155",

outline:"none"

},

pressed:{

fill:"#334155",

outline:"none"

}

}}


/>


))


)}



</Geographies>








{/* Attack Markers */}



{

attacks.map((attack,index)=>(


<Marker

key={index}

coordinates={[

attack.lng,

attack.lat

]}

onClick={()=>setSelectedAttack(attack)}

>



<circle

r={10}

fill="red"

opacity={0.25}

className="animate-ping"

/>




<circle

r={7}

fill={

attack.severity==="HIGH"

?

"red"

:

attack.severity==="MEDIUM"

?

"orange"

:

"green"

}

stroke="white"

strokeWidth={2}

/>





<text

textAnchor="middle"

y={-12}

style={{

fill:"white",

fontSize:"8px"

}}

>

{attack.country}

</text>



</Marker>


))


}








{/* SOC Marker */}



<Marker

coordinates={[

SOC_LOCATION.lng,

SOC_LOCATION.lat

]}

>


<circle

r={8}

fill="cyan"

stroke="white"

strokeWidth={2}

/>



<text

textAnchor="middle"

y={-15}

style={{

fill:"white",

fontSize:"10px"

}}

>

SOC

</text>


</Marker>







</ComposableMap>












{

selectedAttack && (


<div className="
mt-5
rounded-xl
border
border-slate-700
bg-[#0f172a]
p-5
">


<h3 className="
text-xl
font-bold
text-white
">

🚨 Attack Details

</h3>




<p className="text-slate-300 mt-3">

<b>Title:</b> {selectedAttack.title}

</p>



<p className="text-slate-300">

<b>IP:</b> {selectedAttack.ip}

</p>



<p className="text-slate-300">

<b>Location:</b>

{selectedAttack.city},

{selectedAttack.country}

</p>



<p className="text-red-400 font-bold">

<b>Severity:</b>

{selectedAttack.severity}

</p>




<button

onClick={()=>setSelectedAttack(null)}

className="
mt-3
text-cyan-400
"

>

Close

</button>



</div>


)

}







<div className="
mt-5
space-y-3
">


{

attacks.map((attack,index)=>(


<div

key={index}

onClick={()=>setSelectedAttack(attack)}

className="
rounded-lg
bg-[#0f172a]
p-4
cursor-pointer
hover:bg-slate-900
"

>


<p className="
text-white
font-semibold
">

{attack.title}

</p>



<p className="
text-slate-400
text-sm
">

{attack.ip}

</p>



<p className="
text-red-400
font-bold
text-sm
">

{attack.severity}

</p>



</div>


))


}



</div>





</div>

);


}