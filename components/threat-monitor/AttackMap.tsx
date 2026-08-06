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

}



const geoUrl =
"https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";





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


const alertRes =
await fetch(

"/api/security/alerts",

{
cache:"no-store"
}

);



const alerts =
await alertRes.json();





if(!Array.isArray(alerts)){


setLoading(false);

return;


}






const locations:
(AttackLocation | null)[] =

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


ip:
alert.ip,


title:
alert.title,


severity:
alert.severity,



lat:
Number(geo.lat) || 0,



lng:
Number(geo.lng) || 0,



country:
geo.country || "Unknown",



city:
geo.city || "Unknown"



};



}

catch(error){


console.log(error);


return null;


}



}

)

);






const cleanLocations =

locations.filter(

(location):

location is AttackLocation =>

location !== null

);





setAttacks(
cleanLocations
);



}

catch(error){


console.log(
"ATTACK MAP ERROR",
error
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



<>

<circle

r={10}

fill="red"

opacity={0.25}

className="animate-ping"

/>


<circle

r={7}

fill={
attack.severity === "HIGH"
?
"red"
:
attack.severity === "MEDIUM"
?
"orange"
:
"green"
}

stroke="white"

strokeWidth={2}

/>

</>




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


<div className="
flex
justify-between
items-center
">

<h3 className="
text-xl
font-bold
text-white
">

🚨 Attack Details

</h3>


<button

onClick={()=>setSelectedAttack(null)}

className="
text-slate-400
hover:text-white
"

>

✕


</button>


</div>





<div className="
mt-4
space-y-2
">


<p className="text-slate-300">

<b>Title:</b> {selectedAttack.title}

</p>



<p className="text-slate-300">

<b>IP:</b> {selectedAttack.ip}

</p>



<p className="text-slate-300">

<b>Location:</b> {selectedAttack.city}, {selectedAttack.country}

</p>



<p className="
text-red-400
font-bold
">

<b>Severity:</b> {selectedAttack.severity}

</p>



</div>



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

className="
rounded-lg
bg-[#0f172a]
p-4
cursor-pointer
hover:bg-slate-900
"

onClick={()=>setSelectedAttack(attack)}

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
text-slate-400
text-sm
">

{attack.city}, {attack.country}

</p>



<p className="
text-red-400
text-sm
font-bold
">

{attack.severity}

</p>



</div>


))


}






{

attacks.length===0 &&

<p className="
text-slate-400
">

No attack locations found

</p>

}



</div>







</div>


);


}