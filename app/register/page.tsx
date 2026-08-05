"use client";


import {
useState
} from "react";


import {
useRouter
} from "next/navigation";



export default function RegisterPage(){


const router = useRouter();


const [form,setForm]=useState({

name:"",
email:"",
password:""

});


const [error,setError]=useState("");





async function register(){


const res =
await fetch(
"/api/auth/register",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

}

);


const data =
await res.json();



if(!res.ok){

setError(data.message);

return;

}



router.push("/login");


}




return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-black
">


<div className="
w-full
max-w-md
rounded-2xl
border
border-slate-800
bg-[#0f172a]
p-8
">


<h1 className="
text-3xl
font-bold
text-cyan-400
">

CyberShield XDR

</h1>


<p className="
mt-2
text-slate-400
">

Create Analyst Account

</p>




<input

placeholder="Name"

className="
mt-6
w-full
rounded-lg
bg-black
p-3
text-white
"

onChange={
e=>setForm({
...form,
name:e.target.value
})
}

/>



<input

placeholder="Email"

className="
mt-4
w-full
rounded-lg
bg-black
p-3
text-white
"

onChange={
e=>setForm({
...form,
email:e.target.value
})
}

/>




<input

placeholder="Password"

type="password"

className="
mt-4
w-full
rounded-lg
bg-black
p-3
text-white
"

onChange={
e=>setForm({
...form,
password:e.target.value
})
}

/>




{
error &&

<p className="
mt-3
text-red-400
">

{error}

</p>

}




<button

onClick={register}

className="
mt-6
w-full
rounded-lg
bg-cyan-500
py-3
font-bold
text-black
"

>

Create Account

</button>



</div>


</div>

)

}