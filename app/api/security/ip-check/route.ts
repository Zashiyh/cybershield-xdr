import {
  NextRequest,
  NextResponse
} from "next/server";
import Alert from "@/models/Alert";

import {
  connectDB
} from "@/lib/mongodb";


import ThreatScan from "@/models/ThreatScan";



export async function POST(
  req: NextRequest
) {


  try {


    await connectDB();



    const {
      ip
    } = await req.json();




    if(!ip){

      return NextResponse.json(
        {
          message:"IP address required"
        },
        {
          status:400
        }
      );

    }




    const apiKey =
      process.env.ABUSEIPDB_API_KEY;



    if(!apiKey){


      return NextResponse.json(
        {
          message:"AbuseIPDB API key missing"
        },
        {
          status:500
        }
      );


    }





    const response =
      await fetch(

        `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`,

        {

          method:"GET",

          headers:{

            "Key":
            apiKey,


            "Accept":
            "application/json"

          }

        }

      );





    const data =
      await response.json();





    console.log(
      "ABUSEIPDB RESPONSE:",
      data
    );





    if(!response.ok){


      return NextResponse.json(

        {
          message:
          data.errors?.[0]?.detail ||
          "AbuseIPDB request failed"
        },

        {
          status:response.status
        }

      );


    }






    const info =
      data.data;





    const score =
      info.abuseConfidenceScore ?? 0;





    const risk =

      score >= 70

      ?

      "HIGH"

      :

      score >= 30

      ?

      "MEDIUM"

      :

      "CLEAN";







    await ThreatScan.create({

      ip:
      info.ipAddress,


      score,


      country:
      info.countryCode || "Unknown",


      risk,



      isp:
      info.isp || "Unknown",



      domain:
      info.domain || "Unknown",



      reports:
      info.totalReports || 0


      


    });

    if(score >= 30){


await Alert.create({

title:
"Suspicious IP Detected",


ip:
info.ipAddress,


severity:
risk,


status:
"OPEN",


score,


description:
`IP detected with ${score}% threat confidence`

});


}










    return NextResponse.json(

      data

    );





  }

  catch(error){



    console.log(
      "IP CHECK ERROR:",
      error
    );



    return NextResponse.json(

      {
        message:"Server error"
      },

      {
        status:500
      }

    );


  }


}