"use client";


interface Alert {

  _id:string;

  title:string;

  ip:string;

  severity:string;

  status:string;

  description:string;

  createdAt:string;

}



interface LiveFeedProps {

  alerts: Alert[];

}





export default function LiveFeed({

  alerts

}: LiveFeedProps){



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

🚨 Live Alert Feed

</h2>





<div className="
space-y-3
">



{

alerts.map((alert)=>(


<div

key={alert._id}

className="
rounded-xl
bg-[#0f172a]
border
border-slate-800
p-4
hover:bg-slate-900
transition
"

>



<div className="
flex
items-center
justify-between
">


<h3 className="
text-white
font-semibold
">

{alert.title}

</h3>



<span

className={`

text-xs
font-bold
rounded-full
px-3
py-1


${
alert.severity === "HIGH"

?

"bg-red-500/20 text-red-400"

:

alert.severity === "MEDIUM"

?

"bg-yellow-500/20 text-yellow-400"

:

"bg-green-500/20 text-green-400"

}

`}

>

{alert.severity}

</span>



</div>







<p className="
text-slate-400
text-sm
mt-3
">

IP:

{alert.ip}

</p>






<p className="
text-slate-400
text-sm
">

Status:

{alert.status}

</p>






<p className="
text-slate-500
text-xs
mt-3
">

{

new Date(

alert.createdAt

)

.toLocaleString()

}

</p>






</div>


))


}






{

alerts.length === 0 &&

<div className="
text-slate-400
text-center
py-8
">

No active alerts

</div>

}



</div>





</div>


);


}