import Image from "next/image";
import Header from "./components/header";
import Peanut from "./components/peanut";

import PeanutImage from "../assets/peanut-thx.png";

export default function Home() {
  return (
    <main className="bg-slate-100 w-full h-screen flex min-h-screen flex-col items-center">
      <Header />
      <Peanut />
      <Image
        src={PeanutImage}
        alt="peanut"
        width={200}
        height={200}
        className="absolute bottom-6 right-10"
      />
    </main>
  );
}
