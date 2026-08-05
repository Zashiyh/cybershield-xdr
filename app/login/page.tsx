"use client";

import { useState } from "react";


export default function LoginPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  async function login() {

    try {

      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),

        }
      );



      const data = await res.json();



      console.log("STATUS:", res.status);

      console.log("RESPONSE:", data);



      if (res.ok) {

        console.log("LOGIN SUCCESS");


        window.location.assign("/dashboard");


      } 
      else {

        alert(data.message);

      }


    }
    catch(error){

      console.log("LOGIN ERROR:", error);

      alert("Something went wrong");

    }

  }



  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#050816]
      "
    >

      <div
        className="
        w-full
        max-w-md
        rounded-xl
        border
        bg-[#0f172a]
        p-8
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-cyan-400
          "
        >
          CyberShield XDR
        </h1>


        <input

          placeholder="Email"

          className="
          mt-6
          w-full
          rounded-lg
          bg-black/30
          p-3
          outline-none
          "

          value={email}

          onChange={
            (e)=>setEmail(e.target.value)
          }

        />


        <input

          placeholder="Password"

          type="password"

          className="
          mt-4
          w-full
          rounded-lg
          bg-black/30
          p-3
          outline-none
          "

          value={password}

          onChange={
            (e)=>setPassword(e.target.value)
          }

        />


        <button

          onClick={login}

          className="
          mt-6
          w-full
          rounded-lg
          bg-cyan-500
          p-3
          font-bold
          text-black
          "

        >

          Login

        </button>


      </div>

    </div>

  );

}