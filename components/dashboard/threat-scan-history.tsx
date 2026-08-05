"use client";

import { useEffect, useState, useCallback } from "react";

import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  Search,
  X,
  Globe,
  Activity
} from "lucide-react";



interface Scan {

  _id:string;

  ip:string;

  score:number;

  country:string;

  risk:string;

  isp:string;

  domain:string;

  reports:number;

  createdAt:string;

}



export default function ThreatScanHistory(){


const [scans,setScans] =
useState<Scan[]>([]);


const [filtered,setFiltered] =
useState<Scan[]>([]);


const [selected,setSelected] =
useState<Scan | null>(null);

const [refreshing,setRefreshing] =
useState(false);



const [search,setSearch] =
useState("");


const [filter,setFilter] =
useState("ALL");


const [loading,setLoading] =
useState(true);





const getScans = useCallback(
async()=>{


try{


setRefreshing(true);



const res =
await fetch(
"/api/security/scans",
{
cache:"no-store"
}
);



const data =
await res.json();



setScans(data);

setFiltered(data);



}

catch(error){

console.log(
"SCAN FETCH ERROR",
error
);


}

finally{


setLoading(false);

setRefreshing(false);


}



},[]
);





useEffect(()=>{


getScans();



const interval =
setInterval(()=>{


getScans();


},10000);



return()=>clearInterval(interval);



},[
getScans
]);







useEffect(()=>{


let data =
[...scans];



if(search){


data =
data.filter(
(scan)=>

scan.ip
.toLowerCase()
.includes(
search.toLowerCase()
)

);


}




if(filter !== "ALL"){


data =
data.filter(
(scan)=>

scan.risk === filter

);


}



setFiltered(data);



},[
search,
filter,
scans
]);







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
flex
items-center
justify-between
"
>


<h2
className="
text-xl
font-bold
text-white
"
>
Threat Scan History
</h2>



<button

onClick={getScans}

className="
rounded-lg
bg-cyan-500
px-4
py-2
text-sm
font-bold
text-black
"

>

{
refreshing
?
"Refreshing..."
:
"Refresh"
}

</button>


</div>


<p

className="
mb-6
text-sm
text-slate-400
"

>
Click a scan to view details
</p>





<div

className="
mb-5
flex
gap-4
"

>


<div

className="
flex
flex-1
items-center
gap-2
rounded-xl
bg-slate-900
px-4
"

>

<Search
size={18}
/>


<input

placeholder="Search IP"

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

value={filter}

onChange={
e=>setFilter(
e.target.value
)
}


className="
rounded-xl
bg-slate-900
px-4
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
CLEAN
</option>


</select>



</div>







{
loading ?

<p className="text-slate-400">
Loading...
</p>


:


<table

className="
w-full
text-left
"

>


<thead>


<tr

className="
border-b
border-slate-700
text-slate-400
"

>

<th className="p-3">
IP
</th>


<th className="p-3">
Country
</th>


<th className="p-3">
Risk
</th>


<th className="p-3">
Score
</th>


<th className="p-3">
Date
</th>


</tr>


</thead>




<tbody>


{
filtered.map(
(scan)=>(


<tr

key={scan._id}

onClick={()=>setSelected(scan)}

className="
cursor-pointer
border-b
border-slate-800
text-white
hover:bg-slate-900
"

>


<td className="p-3">

{scan.ip}

</td>



<td className="p-3">

{scan.country}

</td>




<td className="p-3">


<span

className={`

rounded-full
px-3
py-1
text-xs
font-bold


${
scan.risk==="HIGH"

?
"bg-red-500/20 text-red-400"

:

scan.risk==="MEDIUM"

?
"bg-yellow-500/20 text-yellow-400"

:

"bg-green-500/20 text-green-400"

}

`}

>


{
scan.risk==="CLEAN"

?

<ShieldCheck
size={14}
className="inline"
/>

:

<ShieldAlert
size={14}
className="inline"
/>

}


{" "}

{scan.risk}


</span>


</td>




<td className="p-3">

{scan.score}/100

</td>




<td className="p-3 text-slate-400">

<Clock
size={14}
className="inline"
/>

{" "}

{
new Date(
scan.createdAt
)
.toLocaleDateString()
}

</td>


</tr>


)

)

}



</tbody>



</table>



}






{
selected && (


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


<div

className="
w-full
max-w-lg
rounded-2xl
border
border-slate-700
bg-[#0f172a]
p-6
"

>


<div

className="
mb-6
flex
justify-between
"

>

<h2

className="
text-xl
font-bold
text-white
"

>
Threat Details
</h2>


<button

onClick={()=>setSelected(null)}

>

<X
className="text-white"
/>

</button>


</div>





<div className="space-y-4 text-slate-300">


<p>
<strong className="text-white">
IP:
</strong>
{" "}
{selected.ip}
</p>


<p>
<Globe
size={16}
className="inline"
/>

{" "}
Country:
{" "}
{selected.country}
</p>



<p>
<Activity
size={16}
className="inline"
/>

{" "}
Threat Score:
{" "}
{selected.score}/100
</p>



<p>
Risk:
{" "}
<span className="text-red-400">
{selected.risk}
</span>
</p>



<p>
ISP:
{" "}
{selected.isp}
</p>



<p>
Domain:
{" "}
{selected.domain}
</p>



<p>
Reports:
{" "}
{selected.reports}
</p>



<p>
Scan Date:
{" "}
{
new Date(
selected.createdAt
)
.toLocaleString()
}
</p>


</div>



</div>


</div>


)

}



</div>


);


}