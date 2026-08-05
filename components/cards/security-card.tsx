import { ReactNode } from "react";


interface Props{

 title:string;

 value:string;

 icon?:ReactNode;

}


export default function SecurityCard({
 title,
 value,
 icon
}:Props){

return(

<div
className="
rounded-xl
border
bg-card
p-5
shadow-lg
backdrop-blur
transition
hover:bg-[#162033]
"
>

<div className="flex justify-between">

<div>

<p className="
text-sm
text-slate-400
">
{title}
</p>


<h2 className="
mt-2
text-3xl
font-bold
">
{value}
</h2>

</div>


<div className="
text-cyan-400
text-2xl
">
{icon}
</div>


</div>


</div>

);

}