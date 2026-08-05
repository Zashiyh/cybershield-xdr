"use client";

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


setAlerts(data);

setFiltered(data);



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

<option>
ALL
</option>

<option>
HIGH
</option>

<option>
MEDIUM
</option>

<option>
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


<span className={`

rounded-full
px-3
py-1
text-xs
font-bold


${
alert.severity==="HIGH"

?

"bg-red-500/20 text-red-400"

:

alert.severity==="MEDIUM"

?

"bg-yellow-500/20 text-yellow-400"

:

"bg-green-500/20 text-green-400"

}

`}>

{alert.severity}

</span>


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
border
border-slate-700
bg-[#020617]
px-3
py-2
text-white
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





<td className="p-4 text-slate-400">


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

<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
"


>


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
mb-6
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