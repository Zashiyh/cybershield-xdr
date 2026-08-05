"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const data = [
  {
    time: "00:00",
    threats: 20,
  },
  {
    time: "04:00",
    threats: 45,
  },
  {
    time: "08:00",
    threats: 32,
  },
  {
    time: "12:00",
    threats: 80,
  },
  {
    time: "16:00",
    threats: 55,
  },
  {
    time: "20:00",
    threats: 95,
  },
  {
    time: "24:00",
    threats: 60,
  },
];


export default function ThreatChart() {


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

        <h2 className="text-xl font-bold text-white">
          Threat Timeline
        </h2>


        <p className="text-sm text-slate-400">
          Security events detected over 24 hours
        </p>

      </div>



      <div
        className="
        h-[320px]
        w-full
        "
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="time"
              stroke="#94a3b8"
            />


            <YAxis
              stroke="#94a3b8"
            />


            <Tooltip />


            <Line

              type="monotone"

              dataKey="threats"

              stroke="#06b6d4"

              strokeWidth={3}

              dot={{
                r:5
              }}

            />


          </LineChart>


        </ResponsiveContainer>


      </div>


    </div>

  );

}