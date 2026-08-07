"use client";

import { Html } from "@react-three/drei";


interface Props {

position:[
 number,
 number,
 number
];

color:string;

label:string;

}


export default function AttackMarker({

position,
color,
label

}:Props){


return (

<group
position={position}
>


<mesh>

<sphereGeometry
args={[0.025,16,16]}
/>


<meshBasicMaterial
color={color}
/>


</mesh>



<Html
distanceFactor={10}
>

<div
style={{

color:"white",

fontSize:"10px",

fontWeight:"bold",

textShadow:
"0 0 10px black"

}}
>

{label}

</div>


</Html>


</group>

);


}