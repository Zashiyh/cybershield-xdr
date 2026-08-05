"use client";


import {
useEffect,
useState
} from "react";


import {
ArrowLeft,
ShieldAlert,
Activity
} from "lucide-react";


import Link from "next/link";



interface Incident{


_id:string;

title:string;

ip:string;

severity:string;

status:string;

description:string;

createdAt:string;


}




export default function IncidentDetails({

params

}:{

params:{
id:string
}

}){


const [incident,setIncident] =
useState<Incident|null>(null);





useEffect(()=>{

loadIncident();

},[]);






async function loadIncident(){


const res =
await fetch(

`/api/security/incidents/${params.id}`

);



const data =
await res.json();



setIncident(data);


}







async function updateStatus(
status:string
){



await fetch(

`/api/security/incidents/${params.id}`,

{

method:"PATCH",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

status

})

}

);



loadIncident();


}






if(!incident){


return (

<div className="text-white">

Loading...

</div>

)

}





return (

<div className="space-y-6">





<Link

href="/dashboard/incidents"

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






<h1 className="
text-4xl
font-bold
text-white
">

{incident.title}

</h1>







<div className="
grid
md:grid-cols-3
gap-6
">





<div className="
rounded-2xl
bg-black
border
border-slate-800
p-6
">


<ShieldAlert
className="text-red-400"
/>


<p className="text-slate-400 mt-3">

Severity

</p>


<h2 className="text-white text-2xl font-bold">

{incident.severity}

</h2>


</div>






<div className="
rounded-2xl
bg-black
border
border-slate-800
p-6
">


<Activity
className="text-cyan-400"
/>


<p className="text-slate-400 mt-3">

Status

</p>


<select

value={incident.status}

onChange={
e=>
updateStatus(
e.target.value
)
}

className="
mt-2
bg-[#020617]
border
border-slate-700
rounded-lg
p-2
text-white
"

>


<option>
OPEN
</option>


<option>
INVESTIGATING
</option>


<option>
RESOLVED
</option>


</select>


</div>








<div className="
rounded-2xl
bg-black
border
border-slate-800
p-6
">


<p className="text-slate-400">

IP Address

</p>


<h2 className="text-white text-xl">

{incident.ip}

</h2>


</div>





</div>








<div className="
rounded-2xl
bg-black
border
border-slate-800
p-6
">


<h2 className="
text-xl
font-bold
text-white
">

Description

</h2>


<p className="
mt-3
text-slate-300
">

{incident.description}

</p>


</div>








<div className="
rounded-2xl
bg-[#0f172a]
border
border-slate-800
p-6
">


<p className="text-slate-400">

Created

</p>


<p className="text-white">

{
new Date(
incident.createdAt
)
.toLocaleString()
}

</p>


</div>





</div>


);


}