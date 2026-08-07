"use client";

import dynamic from "next/dynamic";


const GlobeScene = dynamic(
  () => import("./GlobeScene").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-[650px] flex items-center justify-center text-white">
        Loading 3D Globe...
      </div>
    ),
  }
);


export default function GlobeContainer() {

  return (
    <div className="w-full">
      <GlobeScene />
    </div>
  );

}