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

  incidentCreated?:boolean;

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








async function updateStatus(
id:string,
status:string
){


try{


await fetch(

`/api/security/alerts/${id}`,

{

method:"PATCH",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

status

})

}

);



loadAlerts();



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



if(res.ok){


toast.success(
"Incident Created Successfully"
);


setAlerts(prev=>

prev.map(item=>

item._id===alert._id

?

{
...item,
incidentCreated:true
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


<div className="
flex-1
flex
items-center
gap-3
rounded-xl
border
border-slate-800
bg-[#0f172a]
px-4
">


<Search
size={18}
className="text-slate-400"
/>



<input

placeholder="Search IP..."

value={search}

onChange={
e=>setSearch(
e.target.value
)
}

className="
w-full
bg-transparent
p-3
text-white
outline-none
"

/>


</div>





<select

value={severity}

onChange={
e=>setSeverity(
e.target.value
)
}

className="
rounded-xl
border
border-slate-800
bg-[#0f172a]
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
overflow-hidden
rounded-2xl
border
border-slate-800
bg-black
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
Status
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

filtered.map((alert)=>(


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
mr-2
inline
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


<select

value={alert.status}

onClick={(e)=>
e.stopPropagation()
}

onChange={
e=>
updateStatus(
alert._id,
e.target.value
)
}

className="
rounded-lg
bg-[#020617]
border
border-slate-700
px-3
py-2
"

>


<option value="OPEN">
OPEN
</option>


<option value="INVESTIGATING">
INVESTIGATING
</option>


<option value="RESOLVED">
RESOLVED
</option>


</select>


</td>







<td className="p-4">


<button

type="button"

disabled={
alert.incidentCreated ||
creating===alert._id
}

onClick={(e)=>{

e.stopPropagation();

createIncident(alert);

}}

className={`

rounded-lg
px-3
py-2
text-xs
font-bold

${
alert.incidentCreated

?

"bg-green-500 text-black"

:

"bg-red-500 text-white"

}

`}

>

{

alert.incidentCreated

?

"Incident Created"

:

creating===alert._id

?

"Creating..."

:

"Create Incident"

}


</button>

</td>






<td className="p-4 text-slate-400">


<Clock size={14} className="inline"/>


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
w-full
max-w-lg
rounded-2xl
border
border-slate-700
bg-[#0f172a]
p-6
">


<div className="
flex
justify-between
mb-6
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
space-y-4
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


<p>
Status: {selected.status}
</p>


<p>
{selected.description}
</p>


</div>


</div>


</div>

}



</div>


);


}