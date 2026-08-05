"use client";

import {
  useEffect,
  useState
} from "react";

import {
  Server,
  ShieldAlert,
  ArrowLeft
} from "lucide-react";

import Link from "next/link";


interface Asset {

  _id:string;

  name:string;

  ip:string;

  os:string;

  type:string;

  status:string;

  risk:string;

  riskScore:number;

  alertCount:number;

  lastThreat:string | null;

}



interface Alert {

  title:string;

  ip:string;

  severity:string;

  score:number;

  status:string;

}





export default function AssetDetails({

params

}:{

params:{
id:string
}

}){


const [asset,setAsset] =
useState<Asset | null>(null);


const [alerts,setAlerts] =
useState<Alert[]>([]);





useEffect(()=>{

loadAsset();

},[]);






async function loadAsset(){


try{


const assetRes =
await fetch(

`/api/security/assets/${params.id}`,

{
cache:"no-store"
}

);



const assetData =
await assetRes.json();



setAsset(assetData);






const alertRes =
await fetch(

"/api/security/alerts",

{
cache:"no-store"
}

);



const alertData =
await alertRes.json();




const related =

Array.isArray(alertData)

?

alertData.filter(

(alert:Alert)=>

alert.ip === assetData.ip

)

:

[];




setAlerts(related);



}

catch(error){

console.log(error);

}



}





if(!asset){


return (

<div className="text-white">

Loading...

</div>

)

}







return (


<div className="space-y-6">






<Link

href="/dashboard/assets"

className="
flex
items-center
gap-2
text-cyan-400
"

>

<ArrowLeft size={18}/>

Back

</Link>







<h1

className="
text-4xl
font-bold
text-white
"

>

{asset.name}

</h1>







<div

className="
grid
gap-6
md:grid-cols-2
"

>








<div

className="
rounded-2xl
border
border-slate-800
bg-black
p-6
"

>


<Server

className="text-cyan-400"

size={35}

/>




<h2

className="
mt-4
text-xl
font-bold
text-white
"

>

Asset Information

</h2>





<div

className="
mt-4
space-y-3
text-slate-300
"

>



<p>

IP :

<span className="text-white">

{asset.ip}

</span>

</p>




<p>

OS :

<span className="text-white">

{asset.os}

</span>

</p>




<p>

Type :

<span className="text-white">

{asset.type}

</span>

</p>





<p>

Status :

<span className="text-green-400">

{asset.status}

</span>

</p>







<p>

Risk :

<span

className={`

ml-2
font-bold

${
asset.risk === "HIGH" ||
asset.risk === "CRITICAL"

?

"text-red-400"

:

asset.risk === "MEDIUM"

?

"text-yellow-400"

:

"text-green-400"

}

`}

>

{asset.risk}

</span>

</p>





<p>

Risk Score :

<span className="
font-bold
text-white
">

{asset.riskScore ?? 0}/100

</span>

</p>





<p>

Alert Count :

<span className="
font-bold
text-white
">

{asset.alertCount ?? 0}

</span>

</p>





<p>

Last Threat :

<span className="text-slate-400">

{

asset.lastThreat

?

new Date(
asset.lastThreat
)
.toLocaleString()

:

"No threats detected"

}

</span>

</p>





</div>


</div>









<div

className="
rounded-2xl
border
border-slate-800
bg-black
p-6
"

>



<ShieldAlert

size={35}

className="text-red-400"

/>





<h2

className="
mt-4
text-xl
font-bold
text-white
"

>

Security Alerts

</h2>





<p

className="
mt-2
text-4xl
font-bold
text-red-400
"

>

{alerts.length}

</p>




<p

className="
text-slate-400
"

>

Detected threats

</p>




</div>







</div>









<div

className="
rounded-2xl
border
border-slate-800
bg-black
overflow-hidden
"

>




<h2

className="
p-6
text-xl
font-bold
text-white
"

>

Related Alerts

</h2>







<table

className="
w-full
text-left
"

>


<thead

className="
bg-[#0f172a]
text-slate-400
"

>


<tr>


<th className="p-4">

Alert

</th>


<th className="p-4">

Severity

</th>


<th className="p-4">

Score

</th>


<th className="p-4">

Status

</th>


</tr>


</thead>








<tbody>


{

alerts.length === 0

?

<tr>

<td

colSpan={4}

className="
p-6
text-center
text-slate-400
"

>

No alerts found

</td>

</tr>


:

alerts.map(

(alert,index)=>(


<tr

key={index}

className="
border-t
border-slate-800
text-white
"

>


<td className="p-4">

{alert.title}

</td>



<td className="p-4">

{alert.severity}

</td>



<td className="p-4">

{alert.score}/100

</td>



<td className="p-4">

{alert.status}

</td>



</tr>


)

)

}



</tbody>



</table>




</div>







</div>


);


}