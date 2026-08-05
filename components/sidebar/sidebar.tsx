"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Shield,
  LayoutDashboard,
  Activity,
  Radar,
  Globe,
  Server,
  FileText,
  Users,
  Settings,
  Menu,
  ChevronLeft,
} from "lucide-react";



const menu = [

  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Threat Monitor",
    href: "/dashboard/threats",
    icon: Shield,
  },

  {
    name: "Alerts",
    href: "/dashboard/alerts",
    icon: Radar,
  },

  {
    name: "Incidents",
    href: "/dashboard/incidents",
    icon: Activity,
  },

  {
    name: "Threat Intelligence",
    href: "/dashboard/intelligence",
    icon: Globe,
  },

  {
    name: "Assets",
    href: "/dashboard/assets",
    icon: Server,
  },

  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },

  {
    name: "Users",
    href: "/dashboard/users",
    icon: Users,
  },

  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },

];





export default function Sidebar(){


const pathname = usePathname();



const [collapsed,setCollapsed] =
useState(false);



const [alertCount,setAlertCount] =
useState(0);






useEffect(()=>{


async function getAlertCount(){


try{


const res =
await fetch(
"/api/security/alerts/count",
{
cache:"no-store"
}
);



const data =
await res.json();



setAlertCount(
data.count || 0
);



}

catch(error){

console.log(
"ALERT COUNT ERROR",
error
);


}


}



getAlertCount();



const interval =
setInterval(
getAlertCount,
30000
);



return()=>clearInterval(interval);



},[]);







return (

<aside

className={`

h-screen

${collapsed ? "w-24" : "w-72"}

flex

flex-col

border-r

border-slate-800

bg-[#0B1120]

transition-all

duration-300

overflow-hidden

`}

>





{/* Header */}

<div

className="
flex
items-center
justify-between
border-b
border-slate-800
p-5
"

>


{

!collapsed &&

<div>

<h1

className="
text-xl
font-bold
text-cyan-400
"

>

CyberShield

</h1>


<p

className="
text-xs
text-slate-400
"

>

XDR Platform

</p>


</div>

}




<button

onClick={()=>setCollapsed(!collapsed)}

className="
rounded-lg
p-2
hover:bg-slate-800
"

>


{

collapsed

?

<Menu size={20}/>

:

<ChevronLeft size={20}/>

}


</button>



</div>









{/* Menu */}

<nav

className="
flex-1
space-y-2
overflow-y-auto
p-3
"

>


{

menu.map((item)=>{


const Icon =
item.icon;



const active =
pathname === item.href;



return (


<Link

key={item.href}

href={item.href}

className={`

flex

items-center

justify-between

rounded-xl

px-4

py-3

transition


${
active

?

"bg-cyan-500 text-black font-semibold"

:

"text-slate-300 hover:bg-slate-800"

}


`}

>



<div

className="
flex
items-center
gap-3
"

>


<Icon size={20}/>




{

!collapsed &&

<span>

{item.name}

</span>

}



</div>







{
!collapsed &&
item.name === "Alerts" &&

<span
className="
rounded-full
bg-red-500
px-2
py-1
text-xs
text-white
"
>
{alertCount}
</span>

}



</Link>


);


})

}



</nav>









{/* Footer */}

<div

className="
border-t
border-slate-800
p-4
"

>


{

!collapsed

?

<>

<p

className="
text-xs
text-slate-500
"

>

CyberShield XDR

</p>


<p

className="
mt-1
text-xs
text-slate-600
"

>

Version 1.0.0

</p>


</>


:

<div

className="
flex
justify-center
"

>

<Shield

size={22}

className="
text-cyan-400
"

/>


</div>


}



</div>





</aside>


);

}