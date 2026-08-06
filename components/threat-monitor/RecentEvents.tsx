"use client";


import {
 Activity
} from "lucide-react";


export default function RecentEvents({

incidents

}:{

incidents:any[]

}){


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

Recent Incidents

</h2>



<div className="
space-y-4
">


{
incidents.length===0 &&

<p className="
text-slate-400
">

No incidents detected

</p>

}



{
incidents.slice(0,8).map((incident)=>(


<div

key={incident._id}

className="
rounded-xl
bg-[#0f172a]
p-4
"


>


<div className="
flex
items-center
gap-3
">


<Activity

size={20}

className="text-cyan-400"

/>



<p className="
text-white
font-semibold
">

{incident.title}

</p>


</div>



<p className="
mt-2
text-sm
text-slate-400
">

{incident.ip}

</p>



<div className="
mt-2
flex
justify-between
">


<span className="
text-xs
text-red-400
">

{incident.severity}

</span>


<span className="
text-xs
text-slate-500
">

{
new Date(
incident.createdAt
)
.toLocaleString()
}

</span>


</div>



</div>


))

}


</div>


</div>

);


}