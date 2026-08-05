"use client";


const alerts = [
  {
    threat: "Malware Detection",
    ip: "192.168.1.45",
    severity: "Critical",
    status: "Blocked",
  },

  {
    threat: "SQL Injection Attempt",
    ip: "45.23.67.89",
    severity: "High",
    status: "Detected",
  },

  {
    threat: "Brute Force Attack",
    ip: "10.0.0.12",
    severity: "Medium",
    status: "Investigating",
  },

  {
    threat: "Suspicious Login",
    ip: "172.16.5.22",
    severity: "Low",
    status: "Monitoring",
  },

];


export default function RecentAlerts(){


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


<div className="mb-6">

<h2
className="
text-xl
font-bold
text-white
"
>
Recent Security Alerts
</h2>


<p
className="
text-sm
text-slate-400
"
>
Latest detected security events
</p>


</div>



<div
className="
overflow-x-auto
"
>


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
text-sm
text-slate-400
"
>

<th className="pb-3">
Threat
</th>

<th className="pb-3">
Source IP
</th>

<th className="pb-3">
Severity
</th>

<th className="pb-3">
Status
</th>

</tr>

</thead>



<tbody>


{alerts.map((alert,index)=>(


<tr
key={index}
className="
border-b
border-slate-800
text-sm
text-slate-300
"
>


<td className="py-4">
{alert.threat}
</td>


<td>
{alert.ip}
</td>



<td>

<span
className={`
rounded-full
px-3
py-1
text-xs
font-bold

${
alert.severity==="Critical"
?
"bg-red-500/20 text-red-400"
:
alert.severity==="High"
?
"bg-orange-500/20 text-orange-400"
:
alert.severity==="Medium"
?
"bg-yellow-500/20 text-yellow-400"
:
"bg-blue-500/20 text-blue-400"

}
`}
>

{alert.severity}

</span>

</td>



<td>

<span
className="
rounded-full
bg-slate-800
px-3
py-1
text-xs
"
>

{alert.status}

</span>

</td>


</tr>


))}


</tbody>


</table>


</div>


</div>


);


}