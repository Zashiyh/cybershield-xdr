"use client";

import {
  useEffect,
  useState
} from "react";

import {
  AlertTriangle,
  ShieldCheck,
  Activity,
  FileWarning
} from "lucide-react";


interface Incident {

  _id:string;

  title:string;

  alertId:string;

  ip:string;

  severity:string;

  status:string;

  description:string;

  createdAt:string;

}





export default function IncidentsPage(){


const [incidents,setIncidents] =
useState<Incident[]>([]);



useEffect(()=>{

loadIncidents();

},[]);





async function loadIncidents(){


try{


const res =
await fetch(

"/api/security/incidents",

{
cache:"no-store"
}

);



const data =
await res.json();



setIncidents(

Array.isArray(data)
?
data
:
[]

);



}
catch(error){

console.log(error);

}


}






const total =
incidents.length;



const open =
incidents.filter(

(item)=>

item.status==="OPEN"

).length;



const investigating =
incidents.filter(

(item)=>

item.status==="INVESTIGATING"

).length;




const resolved =
incidents.filter(

item=>

item.status==="RESOLVED"

).length;








return (

<div className="space-y-8">





<div>

<h1 className="
text-4xl
font-bold
text-white
">

Incidents

</h1>


<p className="
mt-2
text-slate-400
">

Security incident investigation center

</p>

</div>








<div className="
grid
gap-6
md:grid-cols-4
">



<Card

title="Total Incidents"

value={total}

icon={
<FileWarning/>
}

/>




<Card

title="Open"

value={open}

icon={
<AlertTriangle/>
}

/>




<Card

title="Investigating"

value={investigating}

icon={
<Activity/>
}

/>





<Card

title="Resolved"

value={resolved}

icon={
<ShieldCheck/>
}

/>



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
Incident
</th>


<th className="p-4">
IP
</th>


<th className="p-4">
Severity
</th>


<th className="p-4">
Status
</th>


<th className="p-4">
Created
</th>


</tr>


</thead>





<tbody>


{

incidents.map(

(item)=>(


<tr

key={item._id}

onClick={()=>{

window.location.href =
`/dashboard/incidents/${item._id}`

}}

className="
cursor-pointer
border-t
border-slate-800
text-white
hover:bg-slate-900
"
>



<td className="p-4">


<div className="
font-semibold
">

{item.title}

</div>


<p className="
text-sm
text-slate-400
">

{item.description}

</p>


</td>






<td className="p-4">

{item.ip}

</td>






<td className="p-4">


<span

className={`

rounded-full
px-3
py-1
text-xs
font-bold


${
item.severity==="HIGH"

?

"bg-red-500/20 text-red-400"

:

item.severity==="MEDIUM"

?

"bg-yellow-500/20 text-yellow-400"

:

"bg-green-500/20 text-green-400"

}

`}

>


{item.severity}


</span>


</td>







<td className="p-4">


<span

className={`

rounded-full
px-3
py-1
text-xs
font-bold


${
item.status==="OPEN"

?

"bg-red-500/20 text-red-400"

:

item.status==="INVESTIGATING"

?

"bg-blue-500/20 text-blue-400"

:

"bg-green-500/20 text-green-400"

}

`}

>


{item.status}


</span>


</td>







<td className="p-4 text-slate-400">


{
new Date(
item.createdAt
)
.toLocaleString()
}


</td>



</tr>


)

)

}



{
incidents.length===0 &&

<tr>

<td

colSpan={5}

className="
p-8
text-center
text-slate-400
"

>

No incidents found

</td>

</tr>

}



</tbody>


</table>



</div>







</div>

);


}









function Card({

title,

value,

icon

}:{

title:string;

value:number;

icon:React.ReactNode;

}){


return (

<div className="
rounded-2xl
border
border-slate-800
bg-black
p-6
">


<div className="
flex
items-center
justify-between
">


<div>

<p className="
text-slate-400
text-sm
">

{title}

</p>


<h2 className="
mt-2
text-3xl
font-bold
text-white
">

{value}

</h2>


</div>



<div className="
text-cyan-400
">

{icon}

</div>


</div>


</div>

)

}