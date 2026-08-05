"use client";

import {
  useEffect,
  useState
} from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";



export default function ThreatAnalytics(){


const [data,setData] =
useState<any>(null);



useEffect(()=>{


async function loadAnalytics(){


const res =
await fetch(
"/api/security/analytics",
{
cache:"no-store"
}
);


const json =
await res.json();


setData(json);


}


loadAnalytics();


},[]);





if(!data){


return (

<div
className="
rounded-2xl
border
border-slate-800
bg-black
p-6
text-slate-400
"
>

Loading analytics...

</div>

);


}





const riskColors:any = {

HIGH:"#ef4444",

MEDIUM:"#facc15",

CLEAN:"#22c55e"

};






return (


<div

className="
grid
gap-6
xl:grid-cols-2
"

>



{/* Risk Chart */}


<div

className="
rounded-2xl
border
border-slate-800
bg-black
p-6
shadow-xl
"

>


<h2

className="
mb-6
text-xl
font-bold
text-white
"

>

Risk Distribution

</h2>



<ResponsiveContainer

width="100%"

height={320}

>


<PieChart>


<Pie

data={data.riskData}

dataKey="count"

nameKey="_id"

cx="50%"

cy="50%"

outerRadius={110}

label


>


{

data.riskData.map(
(item:any,index:number)=>(


<Cell

key={index}

fill={
riskColors[item._id] ||
"#06b6d4"
}

/>


)

)

}



</Pie>



<Tooltip

contentStyle={{

background:"#020617",

border:"1px solid #1e293b",

borderRadius:"12px",

color:"#fff"

}}

/>



</PieChart>



</ResponsiveContainer>


</div>








{/* Country Chart */}


<div

className="
rounded-2xl
border
border-slate-800
bg-black
p-6
shadow-xl
"

>


<h2

className="
mb-6
text-xl
font-bold
text-white
"

>

Top Attack Countries

</h2>





<ResponsiveContainer

width="100%"

height={320}

>


<BarChart

data={data.countryData}

>


<XAxis

dataKey="_id"

stroke="#94a3b8"

/>



<YAxis

stroke="#94a3b8"

/>




<Tooltip

contentStyle={{

background:"#020617",

border:"1px solid #1e293b",

borderRadius:"12px",

color:"#fff"

}}

/>



<Bar

dataKey="count"

fill="#06b6d4"

radius={[
8,
8,
0,
0
]}

/>


</BarChart>


</ResponsiveContainer>



</div>




</div>


);


}