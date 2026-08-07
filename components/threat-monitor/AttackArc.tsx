"use client";

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



export default function AttackArc({

start,

end

}:Props){


const points = [

new THREE.Vector3(
...start
),

new THREE.Vector3(
...end
)

];



const geometry =
new THREE.BufferGeometry()
.setFromPoints(points);



return (

<line>

<bufferGeometry
attach="geometry"
{...geometry}
/>


<lineBasicMaterial

color="red"

/>


</line>

);


}