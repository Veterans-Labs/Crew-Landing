'use client';

import { IPage } from "./interfaces/interfaces";

export default function Home(home : IPage) {
  
  return (
    <video className="video-home"
        src={home.video}
        autoPlay
        loop
        muted
        playsInline          
    />
  );
}