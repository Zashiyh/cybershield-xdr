export function geoTo3D(
  lat:number,
  lng:number,
  radius:number = 1.02
){

  const phi =
    (90 - lat) * (Math.PI / 180);


  const theta =
    (lng + 180) * (Math.PI / 180);



  return [

    -(radius * Math.sin(phi) * Math.cos(theta)),

    radius * Math.cos(phi),

    radius * Math.sin(phi) * Math.sin(theta)

  ] as [
    number,
    number,
    number
  ];

}