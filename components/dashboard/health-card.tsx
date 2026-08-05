"use client";

import {
  Cpu,
  Database,
  Globe,
  Server,
  Activity,
} from "lucide-react";


const systems = [
  {
    name: "CPU Usage",
    value: "42%",
    status: "Normal",
    icon: Cpu,
  },

  {
    name: "Memory Usage",
    value: "68%",
    status: "Normal",
    icon: Server,
  },

  {
    name: "Network",
    value: "Online",
    status: "Healthy",
    icon: Globe,
  },

  {
    name: "Database",
    value: "Connected",
    status: "Healthy",
    icon: Database,
  },

  {
    name: "API Service",
    value: "Running",
    status: "Operational",
    icon: Activity,
  },
];


export default function HealthCard() {


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


      <div className="mb-6">

        <h2
          className="
          text-xl
          font-bold
          text-white
          "
        >
          System Health Monitor
        </h2>


        <p
          className="
          text-sm
          text-slate-400
          "
        >
          Real-time platform status
        </p>

      </div>



      <div
        className="
        space-y-4
        "
      >


        {systems.map((system,index)=>{


          const Icon = system.icon;


          return (

            <div
              key={index}
              className="
              flex
              items-center
              justify-between
              rounded-xl
              bg-slate-900
              p-4
              "
            >


              <div
                className="
                flex
                items-center
                gap-4
                "
              >

                <div
                  className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-cyan-500/10
                  "
                >

                  <Icon
                    size={22}
                    className="text-cyan-400"
                  />

                </div>



                <div>

                  <p
                    className="
                    font-medium
                    text-white
                    "
                  >
                    {system.name}
                  </p>


                  <p
                    className="
                    text-sm
                    text-slate-400
                    "
                  >
                    {system.value}
                  </p>


                </div>


              </div>




              <span
                className="
                rounded-full
                bg-green-500/20
                px-3
                py-1
                text-xs
                font-bold
                text-green-400
                "
              >

                {system.status}

              </span>


            </div>

          );


        })}


      </div>


    </div>

  );

}