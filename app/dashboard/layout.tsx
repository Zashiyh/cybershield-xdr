import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";


export default function DashboardLayout({
children
}:{
children:React.ReactNode
}){


return(

<div
className="
flex
min-h-screen
bg-[#050816]
"
>


<Sidebar/>


<div
className="
flex
flex-1
flex-col
"
>


<Navbar/>


<main
className="
flex-1
p-6
"
>

{children}

</main>


</div>


</div>

)

}