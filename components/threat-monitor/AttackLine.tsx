"use client";

import {
  Line
} from "@react-three/drei";


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



export default function AttackLine({

start,

end

}:Props){


return (

<Line

points={[

start,

end

]}

color="red"

lineWidth={2}


/>

);


}