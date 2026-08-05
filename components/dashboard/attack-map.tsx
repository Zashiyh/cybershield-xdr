"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";


const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


const attacks = [
  {
    name: "United States",
    coordinates: [-100, 40],
    threat: "Malware",
  },

  {
    name: "Russia",
    coordinates: [90, 60],
    threat: "Brute Force",
  },

  {
    name: "China",
    coordinates: [105, 35],
    threat: "Bot Attack",
  },

  {
    name: "Brazil",
    coordinates: [-50, -10],
    threat: "Phishing",
  },
];


export default function AttackMap() {


  return (

    <div
      className="
      rounded-2xl
      border
      border-slate-800
      bg-[#0f172a]
      p-6
      "
    >


      <h2
        className="
        text-xl
        font-bold
        text-white
        "
      >
        Global Attack Map
      </h2>


      <p
        className="
        mb-5
        text-sm
        text-slate-400
        "
      >
        Live cyber attack locations
      </p>



      <div
        className="
        h-[400px]
        w-full
        "
      >


        <ComposableMap>


          <Geographies geography={geoUrl}>

            {({
              geographies,
            }: {
              geographies: any[];
            }) =>

              geographies.map(
                (geo: any) => (

                  <Geography

                    key={
                      geo.rsmKey
                    }

                    geography={
                      geo
                    }

                    fill="#1e293b"

                    stroke="#334155"

                  />

                )
              )

            }


          </Geographies>




          {
            attacks.map(
              (attack, index) => (

                <Marker

                  key={index}

                  coordinates={
                    attack.coordinates as [
                      number,
                      number
                    ]
                  }

                >

                  <circle

                    r={6}

                    fill="#ef4444"

                  />


                  <circle

                    r={15}

                    fill="#ef4444"

                    opacity={0.2}

                  />


                </Marker>

              )
            )
          }



        </ComposableMap>



      </div>



    </div>

  );

}