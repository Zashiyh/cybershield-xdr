import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";


export default function DashboardLayout({

children

}:{

children:React.ReactNode

}){


return (

<div

className="
flex
h-screen
overflow-hidden
bg-[#050816]
"

>


{/* Sidebar */}

<Sidebar />





{/* Main */}

<div

className="
flex
flex-1
flex-col
overflow-hidden
"

>


{/* Navbar */}

<Navbar />





{/* Scroll Area */}

<main

className="
flex-1
overflow-y-auto
p-6
"

>

{children}

</main>




</div>



</div>

);


}