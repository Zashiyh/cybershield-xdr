"use client";

import {
  Bot,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";


export default function AISummary() {


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


      {/* Header */}

      <div
        className="
        mb-6
        flex
        items-center
        gap-3
        "
      >

        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-purple-500/20
          "
        >

          <Bot
            className="text-purple-400"
            size={28}
          />

        </div>


        <div>

          <h2
            className="
            text-xl
            font-bold
            text-white
            "
          >
            AI Threat Summary
          </h2>


          <p
            className="
            text-sm
            text-slate-400
            "
          >
            Automated security analysis
          </p>

        </div>


      </div>




      {/* Risk */}

      <div
        className="
        mb-5
        rounded-xl
        border
        border-red-500/20
        bg-red-500/10
        p-4
        "
      >

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <ShieldAlert
            className="text-red-400"
            size={22}
          />


          <div>

            <p
              className="
              text-sm
              text-slate-400
              "
            >
              Current Risk Level
            </p>


            <p
              className="
              text-xl
              font-bold
              text-red-400
              "
            >
              HIGH
            </p>


          </div>


        </div>


      </div>




      {/* Analysis */}

      <div className="space-y-4">


        <div
          className="
          rounded-xl
          bg-slate-900
          p-4
          "
        >

          <div
            className="
            flex
            items-center
            gap-2
            "
          >

            <AlertTriangle
              size={18}
              className="text-orange-400"
            />

            <h3
              className="
              font-semibold
              text-white
              "
            >
              Detection
            </h3>


          </div>


          <p
            className="
            mt-2
            text-sm
            text-slate-400
            "
          >
            Multiple suspicious login attempts detected
            from unknown IP addresses. Possible brute
            force attack pattern identified.
          </p>


        </div>





        <div
          className="
          rounded-xl
          bg-slate-900
          p-4
          "
        >

          <div
            className="
            flex
            items-center
            gap-2
            "
          >

            <CheckCircle
              size={18}
              className="text-green-400"
            />

            <h3
              className="
              font-semibold
              text-white
              "
            >
              Recommended Action
            </h3>

          </div>


          <p
            className="
            mt-2
            text-sm
            text-slate-400
            "
          >
            Block suspicious IP addresses, enforce MFA,
            and review authentication logs.
          </p>


        </div>



      </div>



    </div>

  );

}