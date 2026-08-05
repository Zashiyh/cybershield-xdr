"use client";


import {
useEffect,
useState
} from "react";


import {
ShieldAlert,
Globe,
Clock
} from "lucide-react";



interface Threat {

_id:string;

ip:string;

country:string;

risk:string;

score:number;

createdAt:string;

}



export default function LiveThreatFeed(){


const [threats,setThreats] =
useState<Threat[]>([]);



async function loadThreats(){


try{


const res =
await fetch(
"/api/security/live-feed",
{
cache:"no-store"
}
);


const data =
await res.json();



setThreats(data);



}

catch(error){

console.log(error);

}


}





useEffect(()=>{


loadThreats();



const interval =
setInterval(()=>{


loadThreats();


},5000);



return()=>clearInterval(interval);



},[]);






return(


<div

className="
rounded-2xl
border
border-slate-800
bg-[#0f172a]
p-6
"

>


<div

className="
mb-6
flex
items-center
justify-between
"

>


<div>


<h2

className="
text-xl
font-bold
text-white
"

>

Live Threat Feed

</h2>



<p

className="
text-sm
text-slate-400
"

>

Real time security events

</p>


</div>



<div

className="
flex
items-center
gap-2
text-green-400
"

>


<span

className="
h-2
w-2
rounded-full
bg-green-400
"

/>


LIVE


</div>



</div>





<div

className="
space-y-4
"

>


{
threats.length === 0

?

<p className="text-slate-400">
No threats detected
</p>


:


threats.map(
(threat)=>(


<div

key={threat._id}

className="
rounded-xl
bg-slate-900
p-4
"

>


<div

className="
flex
justify-between
"

>



<div>


<h3

className="
font-bold
text-white
"

>


<ShieldAlert
size={18}
className="inline mr-2 text-red-400"
/>


{threat.ip}


</h3>




<p

className="
mt-2
text-sm
text-slate-400
"

>


<Globe
size={14}
className="inline"
/>


{" "}

{threat.country}


</p>


</div>





<span

className={`

rounded-full
px-3
py-1
text-xs
font-bold


${
threat.risk==="HIGH"

?

"bg-red-500/20 text-red-400"

:

threat.risk==="MEDIUM"

?

"bg-yellow-500/20 text-yellow-400"

:

"bg-green-500/20 text-green-400"

}

`}

>


{threat.risk}


</span>



</div>





<p

className="
mt-3
text-sm
text-slate-400
"

>

Score:
{" "}
{threat.score}/100


</p>




<p

className="
mt-2
text-xs
text-slate-500
"

>


<Clock
size={12}
className="inline"
/>


{" "}

{
new Date(
threat.createdAt
)
.toLocaleString()
}


</p>



</div>


)

)

}


</div>




</div>


);


}