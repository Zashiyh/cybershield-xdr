"use client";

import { useState } from "react";

import {
  Search,
  ShieldAlert,
  Globe,
  Activity,
  Loader2,
} from "lucide-react";


export default function IPChecker() {


  const [ip, setIp] = useState("");

  const [result, setResult] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);



  async function checkIP() {


    if (!ip) {

      alert("Enter IP address");

      return;

    }



    try {


      setLoading(true);

      setResult(null);



      const res =
        await fetch(
          "/api/security/ip-check",
          {
            method:"POST",

            headers:{
              "Content-Type":"application/json",
            },

            body:JSON.stringify({
              ip
            })

          }
        );



      const data =
        await res.json();



      console.log(
        "API RESPONSE:",
        data
      );



      if(
        !res.ok ||
        !data.data
      ){

        alert(
          data.message ||
          "Unable to check IP"
        );

        return;

      }



      const info =
        data.data;



      setResult({

        ip:
        info.ipAddress || ip,


        score:
        info.abuseConfidenceScore ?? 0,


        country:
        info.countryCode || "Unknown",


        risk:
        info.abuseConfidenceScore >= 70
        ?
        "HIGH"
        :
        info.abuseConfidenceScore >= 30
        ?
        "MEDIUM"
        :
        "CLEAN",



        detections:[

          `${info.totalReports ?? 0} Abuse Reports`,

          `ISP: ${
            info.isp || "Unknown"
          }`,

          `Domain: ${
            info.domain || "Unknown"
          }`,

          `Last Reported: ${
            info.lastReportedAt || "None"
          }`

        ]

      });



    }

    catch(error){


      console.log(
        "IP CHECK ERROR:",
        error
      );


      alert(
        "Server error"
      );


    }

    finally{


      setLoading(false);


    }


  }




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
          IP Reputation Checker
        </h2>



        <p

          className="
          text-sm
          text-slate-400
          "

        >
          Analyze suspicious IP addresses
        </p>


      </div>





      <div

        className="
        flex
        gap-3
        "

      >



        <input


          value={ip}


          onChange={
            e=>setIp(
              e.target.value
            )
          }


          placeholder="Enter IP Address"


          className="
          flex-1
          rounded-xl
          border
          border-slate-700
          bg-slate-900
          p-3
          text-white
          outline-none
          "


        />




        <button


          onClick={checkIP}


          disabled={loading}


          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-cyan-500
          px-5
          font-bold
          text-black
          "

        >


          {
            loading
            ?
            <Loader2
              className="animate-spin"
              size={18}
            />

            :

            <Search
              size={18}
            />

          }


          Scan


        </button>



      </div>






      {
        result && (


          <div

            className="
            mt-6
            space-y-5
            "

          >



            <div

              className="
              grid
              gap-4
              md:grid-cols-3
              "

            >



              <div

                className="
                rounded-xl
                bg-slate-900
                p-4
                "

              >

                <p className="text-sm text-slate-400">
                  Threat Score
                </p>


                <h3

                  className="
                  text-3xl
                  font-bold
                  text-red-400
                  "

                >

                  {result.score}/100

                </h3>


              </div>






              <div

                className="
                rounded-xl
                bg-slate-900
                p-4
                "

              >

                <p className="text-sm text-slate-400">
                  Country
                </p>


                <h3

                  className="
                  text-xl
                  font-bold
                  text-white
                  "

                >


                  <Globe
                    size={18}
                    className="inline mr-2"
                  />


                  {result.country}


                </h3>


              </div>







              <div

                className="
                rounded-xl
                bg-slate-900
                p-4
                "

              >


                <p className="text-sm text-slate-400">
                  Risk Level
                </p>



                <h3

                  className={`
                  text-xl
                  font-bold

                  ${
                    result.risk === "HIGH"
                    ?
                    "text-red-400"
                    :
                    result.risk === "MEDIUM"
                    ?
                    "text-yellow-400"
                    :
                    "text-green-400"
                  }

                  `}

                >


                  <ShieldAlert
                    size={18}
                    className="inline mr-2"
                  />


                  {
                    result.risk === "CLEAN"
                    ?
                    "🟢 CLEAN"
                    :
                    result.risk
                  }


                </h3>



              </div>



            </div>







            <div

              className="
              rounded-xl
              bg-slate-900
              p-5
              "

            >


              <h3

                className="
                mb-3
                font-bold
                text-white
                "

              >

                Detection Details

              </h3>



              <ul

                className="
                space-y-3
                text-slate-300
                "

              >


                {
                  result.detections.map(
                    (
                      item:string,
                      index:number
                    )=>(


                      <li

                        key={index}

                        className="
                        flex
                        items-center
                        gap-2
                        "

                      >


                        <Activity

                          size={16}

                          className="
                          text-red-400
                          "

                        />


                        {item}


                      </li>


                    )

                  )
                }


              </ul>


            </div>




          </div>


        )

      }



    </div>

  );


}