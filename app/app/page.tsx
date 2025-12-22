import { API_URL } from "./config"; 
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import "./globals.css";

async function GetVeterans() {
  const res = await fetch(`${API_URL}/api/veterans?populate=deep`, { cache: 'no-store' });
  if(!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default async function Home() {
  //const veteransData = await GetVeterans();
  //console.log(veteransData);

  return (
    <div className="min-h-dvh flex flex-col">
      <Header nav={[{ label: "VAULT", hoverEffect: false }, { label: "GALLERY", hoverEffect: false, href : "/veterans" }]}/>
      <main className="flex-1 max-w-full w-full items-center justify-between py-5 px-5 align-middle lg:items-center sm:items-center xs:items-center overflow-auto">
        <video
          src={'/pages/home/home_video.mp4'}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </main>
      <Footer />
    </div>
  );
}
