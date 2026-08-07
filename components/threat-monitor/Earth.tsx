"use client";

import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  useFrame,
  useLoader
} from "@react-three/fiber";

import * as THREE from "three";

import AttackMarker from "./AttackMarker";
import AttackLine from "./AttackLine";
import { geoTo3D } from "./geoTo3D";
import AttackPacket from "./AttackPacket";


interface Attack {

  ip:string;

  title:string;

  severity:string;

  lat:number;

  lng:number;

}





const SOC_LOCATION = {

  lat:6.9271,

  lng:79.8612

};






export default function Earth(){


const earthGroup =
useRef<THREE.Group>(null);




const [attacks,setAttacks] =
useState<Attack[]>([]);





const texture =
useLoader(

THREE.TextureLoader,

"/textures/earth.jpg"

);








useEffect(()=>{


async function loadAttacks(){


try{


const res =
await fetch(

"/api/security/alerts",

{
cache:"no-store"
}

);



const alerts =
await res.json();




if(!Array.isArray(alerts))
return;






const locations =

await Promise.all(

alerts
.slice(0,10)
.map(

async(alert:any)=>{


try{


const geoRes =
await fetch(

`/api/security/geo?ip=${alert.ip}`

);



const geo =
await geoRes.json();




const lat =
Number(geo.lat);



const lng =
Number(geo.lng);




if(

!lat ||

!lng ||

lat===0 ||

lng===0

){

return null;

}




return {


ip:alert.ip,


title:alert.title,


severity:alert.severity,


lat,


lng


};



}

catch{


return null;


}


}

)

);







setAttacks(

locations.filter(

(Boolean)

) as Attack[]

);




}

catch(error){


console.log(

"EARTH ERROR",

error

);


}



}




loadAttacks();




const timer =

setInterval(

loadAttacks,

10000

);




return()=>clearInterval(timer);



},[]);









useFrame(()=>{


if(earthGroup.current){


earthGroup.current.rotation.y += 0.0015;


}


});







const socPosition =

geoTo3D(

SOC_LOCATION.lat,

SOC_LOCATION.lng,

1.04

);







return (

<group

ref={earthGroup}

>





{/* Earth */}



<mesh>


<sphereGeometry

args={[

1,

64,

64

]}

/>

{/* Moving Attack Packets */}


{

attacks.map(

(attack,index)=>(


<AttackPacket


key={

"packet-"+index

}


start={

geoTo3D(

attack.lat,

attack.lng,

1.04

)

}


end={

socPosition

}



/>


)

)

}


<meshStandardMaterial

map={texture}

roughness={1}

/>



</mesh>









{/* SOC Marker */}



<AttackMarker


position={

socPosition

}


color="cyan"


label="SOC"

/>









{/* Attack Markers */}



{

attacks.map(

(attack,index)=>(


<AttackMarker


key={index}



position={

geoTo3D(

attack.lat,

attack.lng,

1.04

)

}



color={

attack.severity === "HIGH"

?

"red"

:

attack.severity === "MEDIUM"

?

"orange"

:

"green"

}



label={attack.ip}


/>



)

)

}









{/* Attack Lines */}



{

attacks.map(

(attack,index)=>(


<AttackLine


key={

"line-"+index

}


start={

geoTo3D(

attack.lat,

attack.lng,

1.04

)

}



end={

socPosition

}



/>



)

)

}







</group>


);


}