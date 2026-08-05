"use client";

import { toast } from "sonner";

import {
  useEffect,
  useState
} from "react";

import {
  ShieldAlert,
  Search,
  X,
  Clock
} from "lucide-react";


interface Alert {

  _id:string;

  title:string;

  ip:string;

  severity:string;

  status:string;

  score:number;

  description:string;

  createdAt:string;

  incidentId?:string;

}





export default function AlertsPage(){


const [alerts,setAlerts] =
useState<Alert[]>([]);


const [filtered,setFiltered] =
useState<Alert[]>([]);


const [selected,setSelected] =
useState<Alert | null>(null);


const [search,setSearch] =
useState("");


const [severity,setSeverity] =
useState("ALL");


const [creating,setCreating] =
useState<string | null>(null);





useEffect(()=>{

loadAlerts();

},[]);






async function loadAlerts(){


try{


const res =
await fetch(
"/api/security/alerts",
{
cache:"no-store"
}
);



const data =
await res.json();



const list =
Array.isArray(data)
?
data
:
[];



setAlerts(list);

setFiltered(list);



}

catch(error){

console.log(error);

}


}









async function createIncident(
alert:Alert
){


try{


setCreating(alert._id);



const res =
await fetch(
"/api/security/incidents",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

title:alert.title,

alertId:alert._id,

ip:alert.ip,

severity:alert.severity,

description:alert.description

})

}

);



const data =
await res.json();



console.log(
"INCIDENT RESPONSE",
data
);



if(res.ok){


toast.success(
"Incident Created Successfully"
);



setAlerts(prev =>

prev.map(item =>


item._id === alert._id

?

{

...item,

incidentId:data._id

}

:

item


)

);



}


else{


toast.error(
data.message || "Failed"
);


}



}

catch(error){


console.log(error);


toast.error(
"Incident creation failed"
);


}

finally{


setCreating(null);


}


}










useEffect(()=>{


let data =
[...alerts];



if(search){


data =
data.filter(

(alert)=>

alert.ip
.toLowerCase()
.includes(
search.toLowerCase()
)

);


}





if(severity !== "ALL"){


data =
data.filter(

(alert)=>

alert.severity === severity

);


}



setFiltered(data);



},[
search,
severity,
alerts
]);











return (

<div className="space-y-6">





<div>

<h1 className="
text-4xl
font-bold
text-white
">

Security Alerts

</h1>


<p className="
mt-2
text-slate-400
">

Monitor detected security threats

</p>


</div>







<div className="
flex
gap-4
">



<input

placeholder="Search IP..."

value={search}

onChange={
e=>setSearch(
e.target.value
)
}


className="
flex-1
rounded-xl
bg-[#0f172a]
border
border-slate-800
p-3
text-white
"

/>





<select

value={severity}

onChange={
e=>setSeverity(
e.target.value
)
}


className="
rounded-xl
bg-[#0f172a]
border
border-slate-800
px-5
text-white
"

>


<option value="ALL">
ALL
</option>


<option value="HIGH">
HIGH
</option>


<option value="MEDIUM">
MEDIUM
</option>


<option value="LOW">
LOW
</option>


</select>


</div>








<div className="
rounded-2xl
border
border-slate-800
bg-black
overflow-hidden
">


<table className="
w-full
text-left
">


<thead className="
bg-[#0f172a]
text-slate-400
">


<tr>

<th className="p-4">
Alert
</th>


<th className="p-4">
IP
</th>


<th className="p-4">
Severity
</th>


<th className="p-4">
Score
</th>


<th className="p-4">
Action
</th>


<th className="p-4">
Time
</th>


</tr>


</thead>





<tbody>


{

filtered.map(alert=>(


<tr

key={alert._id}

className="
border-t
border-slate-800
text-white
hover:bg-slate-900
"


>



<td

className="p-4 cursor-pointer"

onClick={()=>setSelected(alert)}

>


<ShieldAlert

size={18}

className="
inline
mr-2
text-red-400
"

/>


{alert.title}


</td>





<td className="p-4">

{alert.ip}

</td>





<td className="p-4">

{alert.severity}

</td>





<td className="p-4">

{alert.score}/100

</td>






<td className="p-4">



{

alert.incidentId

?


<button

onClick={(e)=>{

e.stopPropagation();


window.location.href =
`/dashboard/incidents/${alert.incidentId}`;


}}

className="
rounded-lg
bg-cyan-500
px-3
py-2
text-xs
font-bold
text-black
"

>

View Incident

</button>


:


<button

disabled={
creating===alert._id
}

onClick={(e)=>{

e.stopPropagation();

createIncident(alert);

}}

className="
rounded-lg
bg-red-500
px-3
py-2
text-xs
font-bold
text-white
"

>

{

creating===alert._id

?

"Creating..."

:

"Create Incident"

}


</button>


}


</td>







<td className="
p-4
text-slate-400
">


<Clock
size={14}
className="inline"
/>


{" "}

{
new Date(
alert.createdAt
)
.toLocaleString()
}


</td>




</tr>


))


}



</tbody>


</table>


</div>







{

selected &&

<div className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
">


<div className="
bg-[#0f172a]
border
border-slate-700
rounded-xl
p-6
w-full
max-w-lg
">


<div className="
flex
justify-between
">


<h2 className="
text-xl
font-bold
text-white
">

Alert Details

</h2>


<button

onClick={()=>
setSelected(null)
}

>

<X className="text-white"/>

</button>


</div>




<div className="
mt-5
space-y-3
text-slate-300
">


<p>
Title: {selected.title}
</p>


<p>
IP: {selected.ip}
</p>


<p>
Severity: {selected.severity}
</p>


<p>
Score: {selected.score}/100
</p>


</div>


</div>


</div>


}



</div>

);


}