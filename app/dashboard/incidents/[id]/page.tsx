"use client";

import {
  useEffect,
  useState
} from "react";

import {
  ArrowLeft,
  ShieldAlert,
  Activity,
  Save
} from "lucide-react";

import Link from "next/link";



interface Incident {

  _id:string;

  title:string;

  ip:string;

  severity:string;

  status:string;

  description:string;

  createdAt:string;

  assignedTo:string;

  notes:string;

  resolvedAt:string | null;


  alertId?:{

    _id:string;

    title:string;

    ip:string;

    severity:string;

    score:number;

    status:string;

  };

}





export default function IncidentDetails({

params

}:{

params:Promise<{
id:string
}>

}){


const [incident,setIncident] =
useState<Incident | null>(null);



const [assignedTo,setAssignedTo] =
useState("Unassigned");


const [notes,setNotes] =
useState("");


const [incidentId,setIncidentId] =
useState("");

useEffect(()=>{


async function init(){


const {id} =
await params;


setIncidentId(id);


loadIncident(id);


}


init();


},[]);







async function loadIncident(id:string){


try{


const res =
await fetch(

`/api/security/incidents/${id}`,

{
cache:"no-store"
}

);


const data =
await res.json();


console.log(
"INCIDENT DATA:",
data
);


setIncident(data);


setAssignedTo(
data.assignedTo || "Unassigned"
);


setNotes(
data.notes || ""
);


}

catch(error){

console.log(error);

}


}







async function saveIncident(){



try{


await fetch(

`/api/security/incidents/${incidentId}`,

{

method:"PATCH",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

status:incident?.status,

assignedTo,

notes

})

}

);



loadIncident(incidentId);



}

catch(error){

console.log(error);

}



}







if(!incident){


return (

<div className="text-white p-10">

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









<div className="flex justify-between items-center">


<div>

<h1 className="
text-4xl
font-bold
text-white
">

{incident.title}

</h1>


<p className="
text-slate-400
mt-2
">

Incident Investigation

</p>


</div>


</div>









<div className="
grid
md:grid-cols-3
gap-6
">







<div className="
rounded-2xl
border
border-slate-800
bg-black
p-6
">


<ShieldAlert

className="text-red-400"

/>


<p className="
text-slate-400
mt-4
">

Severity

</p>


<h2 className="
text-3xl
font-bold
text-white
">

{incident.severity}

</h2>


</div>









<div className="
rounded-2xl
border
border-slate-800
bg-black
p-6
">


<Activity

className="text-cyan-400"

/>



<p className="
text-slate-400
mt-4
">

Status

</p>



<select

value={incident.status}

onChange={(e)=>


setIncident({

...incident,

status:e.target.value

})


}

className="
mt-3
bg-[#020617]
border
border-slate-700
rounded-lg
p-3
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



</div>









<div className="
rounded-2xl
border
border-slate-800
bg-black
p-6
">


<p className="
text-slate-400
">

IP Address

</p>


<h2 className="
text-xl
font-bold
text-white
mt-3
">

{incident.ip}

</h2>



</div>







</div>









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
">

Description

</h2>


<p className="
mt-4
text-slate-300
">

{incident.description}

</p>



</div>

{
incident.alertId && (

<div className="
rounded-2xl
border
border-slate-800
bg-[#0f172a]
p-6
space-y-4
">


<h2 className="
text-xl
font-bold
text-white
">

Related Alert

</h2>



<p className="text-slate-400">

Alert Title

</p>


<p className="text-white">

{incident.alertId.title}

</p>




<div className="grid md:grid-cols-3 gap-4">


<div>

<p className="text-slate-400">

IP

</p>

<p className="text-white">

{incident.alertId.ip}

</p>

</div>




<div>

<p className="text-slate-400">

Severity

</p>

<p className="text-red-400 font-bold">

{incident.alertId.severity}

</p>

</div>




<div>

<p className="text-slate-400">

Threat Score

</p>

<p className="text-cyan-400 font-bold">

{incident.alertId.score}/100

</p>

</div>



</div>



</div>

)
}









<div className="
rounded-2xl
border
border-slate-800
bg-black
p-6
space-y-5
">


<h2 className="
text-xl
font-bold
text-white
">

Investigation

</h2>





<div>


<label className="
text-slate-400
">

Assigned Analyst

</label>



<select

value={assignedTo}

onChange={(e)=>

setAssignedTo(
e.target.value
)

}

className="
mt-2
w-full
rounded-lg
border
border-slate-700
bg-[#020617]
p-3
text-white
"

>


<option>
Unassigned
</option>


<option>
SOC Team
</option>


<option>
John Smith
</option>


<option>
Sarah Lee
</option>



</select>


</div>







<div>


<label className="
text-slate-400
">

Investigation Notes

</label>



<textarea


rows={5}


value={notes}


onChange={(e)=>

setNotes(
e.target.value
)

}


className="
mt-2
w-full
rounded-lg
border
border-slate-700
bg-[#020617]
p-3
text-white
"

/>



</div>








<button

onClick={saveIncident}

className="
flex
items-center
gap-2
rounded-lg
bg-cyan-500
px-5
py-3
font-bold
text-black
"

>


<Save size={18}/>

Save Changes


</button>






</div>









<div className="
rounded-2xl
border
border-slate-800
bg-[#0f172a]
p-6
">


<p className="
text-slate-400
">

Created

</p>


<p className="
text-white
mt-2
">

{
new Date(
incident.createdAt
)
.toLocaleString()

}

</p>





{

incident.resolvedAt &&

<p className="
mt-3
text-green-400
">

Resolved:

{
new Date(
incident.resolvedAt
)
.toLocaleString()

}

</p>

}





</div>









</div>

);


}