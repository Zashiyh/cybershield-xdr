"use client";


import {
useEffect,
useState
} from "react";



interface Attack{

title:string;

ip:string;

severity:string;

createdAt:string;

}



export default function LiveAttackFeed(){


const [alerts,setAlerts]=
useState<Attack[]>([]);



async function load(){


const res =
await fetch(
"/api/security/alerts",
{
cache:"no-store"
}
);


const data =
await res.json();



if(Array.isArray(data)){

setAlerts(
data.slice(0,5)
);

}


}



useEffect(()=>{


load();


const timer =
setInterval(
load,
5000
);


return()=>clearInterval(timer);



},[]);





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

⚡ Live Attack Feed

</h2>



<div className="
space-y-3
">


{

alerts.map((item,index)=>(


<div

key={index}

className="
rounded-xl
bg-[#0f172a]
p-4
border
border-slate-800
"

>


<div className="
flex
justify-between
">


<p className="
text-white
font-semibold
">

{item.title}

</p>



<span className="
text-red-400
text-sm
font-bold
">

{item.severity}

</span>



</div>




<p className="
text-slate-400
text-sm
mt-2
">

IP:
{item.ip}

</p>




<p className="
text-slate-500
text-xs
mt-2
">

{
new Date(
item.createdAt
)
.toLocaleTimeString()

}

</p>



</div>


))


}


</div>



</div>


);


}