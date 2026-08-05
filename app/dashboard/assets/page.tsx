"use client";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState
} from "react";

import {
  Search,
  Plus,
  Server,
  X
} from "lucide-react";



interface Asset {

  _id:string;

  name:string;

  ip:string;

  os:string;

  type:string;

  status:string;

  risk:string;

  lastSeen:string;

}



export default function AssetsPage(){


const [assets,setAssets] =
useState<Asset[]>([]);


const [filtered,setFiltered] =
useState<Asset[]>([]);


const [search,setSearch] =
useState("");

const router = useRouter();

const [open,setOpen] =
useState(false);



const [form,setForm] =
useState({

name:"",
ip:"",
os:"",
type:"Endpoint"

});





useEffect(()=>{

loadAssets();

},[]);





async function loadAssets(){


const res =
await fetch(
"/api/security/assets",
{
cache:"no-store"
}
);


const data =
await res.json();



setAssets(data);

setFiltered(data);


}







async function addAsset(){


try{


await fetch(

"/api/security/assets",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

...form,

status:"Online",

risk:"LOW"

})

}

);



setOpen(false);


setForm({

name:"",
ip:"",
os:"",
type:"Endpoint"

});


loadAssets();


}

catch(error){

console.log(error);

}


}








useEffect(()=>{


const data =
assets.filter(

(asset)=>

asset.name
.toLowerCase()
.includes(
search.toLowerCase()
)

||

asset.ip
.includes(search)

);



setFiltered(data);



},[
search,
assets
]);







return (

<div className="space-y-6">


{/* Header */}

<div className="
flex
items-center
justify-between
">


<div>


<h1 className="
text-4xl
font-bold
text-white
">

Assets

</h1>


<p className="
mt-2
text-slate-400
">

Monitor connected endpoints and servers

</p>


</div>





<button

onClick={()=>setOpen(true)}

className="
flex
items-center
gap-2
rounded-xl
bg-cyan-500
px-5
py-3
font-semibold
text-black
"

>

<Plus size={18}/>

Add Asset

</button>



</div>








{/* Search */}

<div className="
flex
items-center
gap-3
rounded-xl
border
border-slate-800
bg-[#0f172a]
px-4
">


<Search
size={18}
className="text-slate-400"
/>


<input

placeholder="Search asset or IP..."

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








{/* Table */}

<div className="
overflow-hidden
rounded-2xl
border
border-slate-800
bg-black
">


<table className="
w-full
text-left
">


<thead className="
bg-[#0f172a]
text-slate-400
">


<tr>

<th className="p-4">
Asset
</th>

<th className="p-4">
IP
</th>

<th className="p-4">
OS
</th>

<th className="p-4">
Type
</th>

<th className="p-4">
Status
</th>

<th className="p-4">
Risk
</th>

</tr>


</thead>





<tbody>


{

filtered.map(

(asset)=>(


<tr

key={asset._id}

onClick={()=>{

router.push(
`/dashboard/assets/${asset._id}`
)

}}

className="
cursor-pointer
border-t
border-slate-800
text-white
hover:bg-slate-900
transition
"

>

<td className="p-4">


<Server

size={18}

className="
inline
mr-2
text-cyan-400
"

/>


{asset.name}


</td>



<td className="p-4">

{asset.ip}

</td>




<td className="p-4">

{asset.os}

</td>




<td className="p-4">

{asset.type}

</td>




<td className="p-4">


<span className="

rounded-full
bg-green-500/20
px-3
py-1
text-xs
text-green-400

">

{asset.status}

</span>


</td>





<td className="p-4">


<span className="

rounded-full
bg-green-500/20
px-3
py-1
text-xs
text-green-400

">

{asset.risk}

</span>


</td>



</tr>


)

)

}


</tbody>


</table>


</div>








{/* Add Modal */}


{

open &&

<div className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
">


<div className="
w-full
max-w-lg
rounded-2xl
border
border-slate-700
bg-[#0f172a]
p-6
">


<div className="
mb-6
flex
justify-between
">


<h2 className="
text-xl
font-bold
text-white
">

Add Asset

</h2>



<button

onClick={()=>setOpen(false)}

>

<X className="text-white"/>

</button>


</div>





<div className="
space-y-4
">


<input

placeholder="Asset Name"

value={form.name}

onChange={
e=>
setForm({
...form,
name:e.target.value
})
}


className="
w-full
rounded-lg
bg-black
p-3
text-white
"

/>



<input

placeholder="IP Address"

value={form.ip}

onChange={
e=>
setForm({
...form,
ip:e.target.value
})
}


className="
w-full
rounded-lg
bg-black
p-3
text-white
"

/>



<input

placeholder="Operating System"

value={form.os}

onChange={
e=>
setForm({
...form,
os:e.target.value
})
}


className="
w-full
rounded-lg
bg-black
p-3
text-white
"

/>





<button

onClick={addAsset}

className="
w-full
rounded-lg
bg-cyan-500
py-3
font-bold
text-black
"

>

Save Asset

</button>



</div>


</div>


</div>


}


</div>

);

}