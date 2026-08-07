"use client";

import {
  useFrame
} from "@react-three/fiber";

import {
  useRef
} from "react";

import * as THREE from "three";


interface Props {

start:[
number,
number,
number
];

end:[
number,
number,
number
];

}



export default function AttackPacket({

start,

end

}:Props){



const packet =
useRef<THREE.Mesh>(null);



const progress =
useRef(0);




useFrame(()=>{


if(packet.current){


progress.current += 0.01;



if(progress.current > 1){

progress.current = 0;

}



packet.current.position.x =

start[0] +

(end[0]-start[0])
*
progress.current;



packet.current.position.y =

start[1] +

(end[1]-start[1])
*
progress.current;



packet.current.position.z =

start[2] +

(end[2]-start[2])
*
progress.current;



}


});





return (

<mesh

ref={packet}

position={start}

>


<sphereGeometry

args={[

0.035,

16,

16

]}

/>


<meshBasicMaterial

color="yellow"

/>



</mesh>


);


}